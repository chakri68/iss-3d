import { useState } from "react";
import _ from "lodash";
import {
  Accordion,
  Label,
  Message,
  Form,
  Icon,
  Button,
  Menu,
  Header,
  Segment,
  Input,
  List,
  Container,
} from "semantic-ui-react";

export default function RightBar() {
  let [passData, setPassData] = useState([]);
  let [location, setLocation] = useState("");
  let [loading, setLoading] = useState(false);
  async function getOverPassData(queryString) {
    let res = await fetch("/api/passdata", {
      method: "POST",
      body: JSON.stringify({
        query: {
          q: queryString,
        },
      }),
    });
    let data = await res.json();
    console.log(data);
    return data.data;
  }

  let panels = [
    {
      key: "panel-1",
      title: {
        content: <Label color="blue" content="Overhead pass" />,
      },
      content: {
        content: (
          <Segment inverted loading={loading}>
            {passData.length == 0 ? (
              <>
                <Message
                  info
                  content="Find out when ISS passes over your location!"
                />
                <Form
                  inverted
                  onSubmit={() => {
                    setLoading(true);
                    getOverPassData(location).then((data) => {
                      setLoading(false);
                      console.log(data.passes);
                      setPassData(data.passes);
                    });
                  }}
                >
                  <Form.Input
                    fluid
                    icon="search"
                    name="Location"
                    placeholder="Location"
                    value={location}
                    onChange={(e, { name, value }) => setLocation(value)}
                  />
                  <Form.Button content="Search" />
                </Form>
              </>
            ) : (
              <Segment>
                <Button onClick={() => setPassData([])} fluid>
                  <Icon name="backward" />
                  Search for another location
                </Button>
                <Message
                  info
                  header="ISS will pass over your location at"
                  content={passData.map((pass) => (
                    <Segment vertical key={pass.start} textAlign="left">
                      Start: {new Date(pass.start).toUTCString()}
                      <br />
                      End: {new Date(pass.end).toUTCString()}
                      <br />
                      Max Elevation: {pass.max_elevation} kms
                    </Segment>
                  ))}
                />
              </Segment>
            )}
          </Segment>
        ),
      },
    },
  ];
  // let panels = _.times(3, (i) => ({
  //   key: `panel-${i}`,
  //   title: {
  //     content: <Label color="blue" content="CLICK ME" />,
  //   },
  //   content: {
  //     content: <Message info header="HEADER" content="CONTENT" />,
  //   },
  // }));
  return (
    <>
      <Menu.Item>
        <Header inverted as="h2">
          More Options
        </Header>
      </Menu.Item>
      <Accordion inverted fluid panels={panels}></Accordion>
    </>
  );
}