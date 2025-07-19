'use client';

import { Card } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';

/* Renders a single Contacts. See list/page.tsx. */
const ContactCard = ({ contact }: { contact : Contact }) => (
  <Card className="h-100">
    <Card.Header>
      <img src={contact.image} width={75} alt={`${contact.firstName} ${contact.lastName}`} />
      <Card.Title>
        {contact.firstName}
        &nbsp;
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {contact.description}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default ContactCard;
