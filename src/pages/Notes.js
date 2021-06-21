import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import NoteCard from '../components/NoteCard';

export default function Notes() {
	const [notes, setNotes] = useState([]);
	useEffect(() => {
		fetch('http://localhost:8000/notes')
			.then((res) => res.json())
			.then((resData) => setNotes(resData));
	}, []);

	async function handleDeleteNote(noteId) {
		await fetch('http://localhost:8000/notes/' + noteId, {
			method: 'DELETE',
		});
		const updatedNotes = notes.filter(({ id }) => id !== noteId);
		setNotes(updatedNotes);
	}
	return (
		<Container>
			<Grid container spacing={3}>
				{notes &&
					notes.map((note) => (
						<Grid key={note.id} item xs={12} sm={6} md={3}>
							<NoteCard note={note} handleDeleteNote={handleDeleteNote} />
						</Grid>
					))}
			</Grid>
		</Container>
	);
}
