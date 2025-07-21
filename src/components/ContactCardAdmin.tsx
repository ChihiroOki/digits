'use client';

import { Contact } from '@prisma/client';
import { Card, Image } from 'react-bootstrap';

/* Renders a single Contact. See list/page.tsx. */
const ContactCardAdmin = ({ contact }: { contact : Contact }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contact.image} width={75} />
      <Card.Title>
        {contact.firstName}
        &nbsp;
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
    <Card.Footer className="block-quote-footer">
      {contact.owner}
    </Card.Footer>
  </Card>
);

export default ContactCardAdmin;
