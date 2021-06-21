import React, { useState } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import {
	Button,
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	btnSubmit: {
		fontSize: '.9rem',
		boxShadow: 'none',
		borderRadius: '0px',
		'&:hover': {
			color: '#FAFAFA',
		},
	},
	textTitle: {
		fontSize: '1.6rem',
	},
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: 'block',
	},
});

export default function Create() {
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [details, setDetail] = useState('');
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailError] = useState(false);
	const [category, setCategory] = useState('todos');

	const classes = useStyles();

	const handleSubmit = (e) => {
		e.preventDefault();
		setTitleError(false);
		setDetailError(false);
		if (title === '') {
			setTitleError(true);
		}
		if (details === '') {
			setDetailError(true);
		}
		console.log('[title,details,category]', title, details, category);
		fetch('http://localhost:8000/notes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				details,
				category,
			}),
		}).then(() => history.push('/'));
	};

	return (
		<Container>
			<Typography className={classes.textTitle} variant="h6" color="textSecondary" component="h2" gutterBottom>
				Create a New Note
			</Typography>

			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					onChange={(e) => setTitle(e.target.value)}
					className={classes.field}
					label="Note title"
					color="primary"
					variant="outlined"
					fullWidth
					error={titleError}
					required
				/>
				<TextField
					onChange={(e) => setDetail(e.target.value)}
					className={classes.field}
					label="Details"
					color="primary"
					multiline
					rows={4}
					variant="outlined"
					fullWidth
					error={detailsError}
					required
				/>
				<FormControl className={classes.field}>
					<FormLabel>Note Category</FormLabel>
					<RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
						<FormControlLabel control={<Radio />} value="money" label="Money" />
						<FormControlLabel control={<Radio />} value="todos" label="Todos" />
						<FormControlLabel control={<Radio />} value="reminders" label="Reminders" />
						<FormControlLabel control={<Radio />} value="work" label="Work" />
					</RadioGroup>
				</FormControl>

				<Button className={classes.btnSubmit} type="submit" variant="contained" color="primary">
					Submit
				</Button>
			</form>
		</Container>
	);
}
