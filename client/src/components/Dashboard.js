import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ListIcon from "@material-ui/icons/List";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Copyright from "./Copyright";

import refreshAuthToken from "../API-requests/signIn/refreshAuthToken";
import handleSignOut from "../API-requests/signOut/handleSignOut";

const drawerWidth = 240;
let refreshAuthTokenId = null;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
}));

export default function Dashboard(props) {
	if (refreshAuthTokenId) clearInterval(refreshAuthTokenId);
	refreshAuthTokenId = setInterval(refreshAuthToken, 4000);

	const classes = useStyles();
	const [values, setValues] = React.useState({
		open: true,
		component: "My Profile",
	});

	const handleDrawerOpen = () => {
		setValues({ ...values, open: true });
	};

	const handleDrawerClose = () => {
		setValues({ ...values, open: false });
	};

	const handleClickMyProfile = () => {
		setValues({ ...values, component: "My Profile" });
	};

	const handleClickFinishedTodos = () => {
		setValues({ ...values, component: "Finished Todos" });
	};

	const handleClickPendingTodos = () => {
		setValues({ ...values, component: "Pending Todos" });
	};

	const handleClickAddTodos = () => {
		setValues({ ...values, component: "Add Todos" });
	};

	const handleClickSignOut = () => {
		clearInterval(refreshAuthTokenId);
		handleSignOut(() => {
			props.history.push("/");
		});
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="absolute"
				className={clsx(classes.appBar, values.open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							values.open && classes.menuButtonHidden
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						className={classes.title}
					>
						{values.component}
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(
						classes.drawerPaper,
						!values.open && classes.drawerPaperClose
					),
				}}
				open={values.open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<div>
						<ListItem button onClick={handleClickMyProfile}>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText primary="My Profile" />
						</ListItem>
						<ListItem button onClick={handleClickFinishedTodos}>
							<ListItemIcon>
								<PlaylistAddCheckIcon />
							</ListItemIcon>
							<ListItemText primary="Finished Todos" />
						</ListItem>
						<ListItem button onClick={handleClickPendingTodos}>
							<ListItemIcon>
								<ListIcon />
							</ListItemIcon>
							<ListItemText primary="Pending Todos" />
						</ListItem>
						<ListItem button onClick={handleClickAddTodos}>
							<ListItemIcon>
								<PlaylistAddIcon />
							</ListItemIcon>
							<ListItemText primary="Add Todos" />
						</ListItem>
						<ListItem button onClick={handleClickSignOut}>
							<ListItemIcon>
								<PowerSettingsNewIcon />
							</ListItemIcon>
							<ListItemText primary="Sign Out" />
						</ListItem>
					</div>
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					{(() => {
						switch (2) {
						}
					})()}
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	);
}
