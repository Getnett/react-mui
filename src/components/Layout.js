import {
	AppBar,
	Avatar,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	page: {
		backgroundColor: '#f9f9f9',
		width: '100%',
		padding: theme.spacing(3),
	},

	drawer: {
		width: drawerWidth,
	},
	paperDrawer: {
		width: drawerWidth,
	},
	active: {
		backgroundColor: '#f4f4f4',
	},
	title: {
		padding: theme.spacing(2),
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
	},
	toolbar: theme.mixins.toolbar,

	appBarTitle: {
		flexGrow: 1,
	},
	avater: {
		marginLeft: theme.spacing(2),
	},
}));

export default function Layout({ children }) {
	const history = useHistory();
	const location = useLocation();
	const classes = useStyles();

	const menuItems = [
		{
			text: 'My Notes',
			icon: <SubjectOutlined color="primary" />,
			path: '/',
		},
		{
			text: 'Create Note',
			icon: <AddCircleOutlineOutlined color="primary" />,
			path: '/create',
		},
	];
	return (
		<div className={classes.root}>
			<AppBar color="secondary" className={classes.appBar} elevation={0}>
				<Toolbar>
					<Typography className={classes.appBarTitle}>Notes MUI</Typography>
					<Typography>User</Typography>
					<Avatar src="./user.png" className={classes.avater} />
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.paperDrawer,
				}}
				anchor="left"
			>
				<div>
					<Typography className={classes.title} variant="h4">
						Notes App
					</Typography>
				</div>
				<List>
					{menuItems.map((item) => (
						<ListItem
							key={item.text}
							className={location.pathname === item.path ? classes.active : null}
							button
							onClick={() => history.push(item.path)}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
			</Drawer>

			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
}
