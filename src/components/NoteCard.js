import { Avatar, Card, CardContent, CardHeader, IconButton, makeStyles, Typography } from '@material-ui/core';
import { blue, green, purple, red, yellow } from '@material-ui/core/colors';
import { DeleteOutline } from '@material-ui/icons';

const useStyles = makeStyles({
	avatar: {
		backgroundColor: (note) => {
			switch (note.category) {
				case 'work':
					return green[700];
				case 'todos':
					return blue[500];
				case 'money':
					return yellow[600];
				case 'reminders':
					return red[600];
				default:
					return purple[700];
			}
		},
	},
});

export default function NoteCard({ note, handleDeleteNote }) {
	const classes = useStyles(note);
	return (
		<Card elevation={2}>
			<CardHeader
				avatar={<Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar>}
				action={
					<IconButton onClick={() => handleDeleteNote(note.id)}>
						<DeleteOutline />
					</IconButton>
				}
				title={note.title}
				subheader={note.category}
			/>
			<CardContent>
				<Typography color="secondary">{note.details}</Typography>
			</CardContent>
		</Card>
	);
}
