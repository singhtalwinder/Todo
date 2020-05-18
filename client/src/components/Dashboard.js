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

import handleSignOut from "../API-requests/signOut/handleSignOut";
import refreshAuthToken from "../API-requests/signIn/refreshAuthToken";

import Copyright from "./Copyright";
import MyProfile from "./MyProfile";
import FinishedTodos from "./FinishedTodos";
import PendingTodos from "./PendingTodos";
import AddTodos from "./AddTodos";

const drawerWidth = 240;
let refreshAuthTokenId = setInterval(refreshAuthToken, 14 * 60000);

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
	const classes = useStyles();

	const [openDrawer, handleDrawer] = React.useState(true);
	const [component, setComponent] = React.useState("Add Todos");

	const handleDrawerOpen = () => {
		handleDrawer(true);
	};

	const handleDrawerClose = () => {
		handleDrawer(false);
	};

	const handleClickMyProfile = () => {
		setComponent("My Profile");
	};

	const handleClickFinishedTodos = () => {
		setComponent("Finished Todos");
	};

	const handleClickPendingTodos = () => {
		setComponent("Pending Todos");
	};

	const handleClickAddTodos = () => {
		setComponent("Add Todos");
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
				className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							openDrawer && classes.menuButtonHidden
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
						{component}
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(
						classes.drawerPaper,
						!openDrawer && classes.drawerPaperClose
					),
				}}
				open={openDrawer}
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
						switch (component) {
							case "My Profile":
								return <MyProfile />;

							case "Finished Todos":
								return <FinishedTodos />;

							case "Pending Todos":
								return <PendingTodos />;

							case "Add Todos":
								return <AddTodos />;

							default:
								return <AddTodos />;
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
