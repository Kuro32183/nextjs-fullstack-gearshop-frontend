import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

const RestaurantList = (props) => {
  const { loading, error, data } = useQuery(query);

  if (error) return "レストランの読み込みに失敗しました";

  if (loading === true) {
    return <span>Loading...</span>;
  }

  if (data.restaurants && data.restaurants.length) {
    const searchQuery = data.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(props.search)
    );
    return (
      <Row>
        {searchQuery.map((res) => (
          <Col xs="6" sm="4" key={res.id}>
            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
              <CardImg
                top={true}
                style={{ height: 250 }}
                src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Link
                  as={`/restaurants/${res.id}`}
                  href={`/restaurants?id=${res.id}`}
                >
                  <a className="btn btn-primary">View</a>
                </Link>
              </div>
            </Card>
          </Col>
        ))}

        <style jsx global>
          {`
            a {
              color: white;
            }
            a:link {
              text-decoration: none;
              color: white;
            }
            a:hover {
              color: white;
            }
            .card-columns {
              column-count: 3;
            }
          `}
        </style>
      </Row>
    );
  } else {
    return <h1>レストランが見つからない</h1>;
  }
};
export default RestaurantList;
