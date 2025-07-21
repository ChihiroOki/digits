'use client';

import { ListGroup } from 'react-bootstrap';

// Define the Note type locally if not available from @prisma/client
type Note = {
  id: number;
  note: string;
  createdAt: Date;
  // Add other fields as needed
};

/* Renders a single Note. See ContactCard.tsx. */
const NoteItem = ({ note }: { note : Note }) => (
  <ListGroup.Item>
    <p className="fw-lighter">{note.createdAt.toLocaleDateString('en-US')}</p>
    <p>{note.note}</p>
  </ListGroup.Item>

);

export default NoteItem;
