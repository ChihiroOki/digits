'use client';

import { Contact, Note } from '@prisma/client';
import Link from 'next/link';
import { Card, Image, ListGroup } from 'react-bootstrap';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from './AddNoteForm';

/* Renders a single Contact. See list/page.tsx. */
const ContactCard = ({ contact, notes }: { contact : Contact, notes: Note[] }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contact.image} width={75} alt={`${contact.firstName} ${contact.lastName}`} />
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
      <ListGroup variant="flush">
        {notes.map((note) => <NoteItem key={note.id} note={note} />)}
      </ListGroup>
      <AddNoteForm contact={contact} />
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
