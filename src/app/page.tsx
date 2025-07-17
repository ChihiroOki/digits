import { Col, Container, Row } from 'react-bootstrap';
import { FileEarmarkTextFill, PeopleFill, Calendar2CheckFill } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Container>
        <Row className="align-middle text-center">
          <Col xs={4}>
            <PeopleFill size={100} />
            <h1>
              This address book enables any number of users to register and save their business contacts.
              <br />
              You can only see the contacts you have created.
            </h1>
          </Col>
          <Col xs={4}>
            <FileEarmarkTextFill size={100} />
            <h1>For each contact, you can save their name, address, and phone number.</h1>
          </Col>
          <Col xs={4}>
            <Calendar2CheckFill size={100} />
            <h1>
              Each time you make contact with a contact,
              <br />
              you can write a note that summarizes the conversation.
              <br />
              This note is saved along with a timestamp with the contact.
            </h1>
          </Col>

        </Row>
      </Container>
    </Container>
  </main>
);

export default Home;
