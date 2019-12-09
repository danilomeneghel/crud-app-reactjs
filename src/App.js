import React, { Component, useState, Fragment, useEffect  } from 'react';
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, IconButton, Modal } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import MUIDataTable from "mui-datatables";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
	top: '50%',
    left: '55%',
    transform: 'translate(-50%, -55%)',
    width: '400px',
    border: '2px solid #000',
    padding: '16px 32px 24px',
    position: 'absolute',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
    backgroundColor: '#fff',
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
	flexGrow: 1,
    display: 'block',
	color: "#fff"
  },
});

class App extends React.Component {

	constructor (props) {
		super(props);
	  
		this.open = false;
		this.state = { open: false, edit: false };	
		this.array = [];
		this.currentUser = [];
		this.editing = false;
	}

	loadContentFromServer() {
		const url = 'https://jsonplaceholder.typicode.com/users';

		fetch(url)
		.then(response => response.json())
		.then(json => {
		 this.setState({ results: json });
		});
	}
	
	componentDidMount() {
		this.loadContentFromServer();
	}

	render() {
		const classes = styles();
		const array = this.array;
		var data = [];
		var open = false;
		var editing = false;
		var currentUser = [];
		
		const handleOpen = () => {
			this.setState({ open: true });
		};
		
		const handleClose = () => {
			this.setState({ open: false });
		};
		
		open = this.state.open;
		
		if(!!this.state.results) {
			this.array = this.state.results.map(result => [result.id, result.name, result.username, result.email, '']);
		}
		
		// CRUD operations
		const addUser = user => {
			user.unshift(this.array.length + 1);
			user.push('');			
			this.setState({ array: this.array.concat([user]) });			
		};
		
		const addButton = () => {
			this.setState({ edit: false });
			handleOpen();
		};
		
		if(!!this.state.array) {
			data = this.state.array;
		} else {
			data = this.array;
		}
		
		const deleteUser = id => {
			this.setState({ edit: false });
			this.setState({ array: this.state.array.filter(user => user.id !== id) });
		};
		
		const updateUser = (id, updatedUser) => {
			this.setState({ edit: false });
			this.setState({ array: this.state.array.map(user => (user.id === id ? updatedUser : data)) });
		};
		
		const editButton = user => {
			this.setState({ edit: true });
			this.setState({ arrayEdit: [user[0], user[1], user[2], user[3], ''] });
			handleOpen();
		};
		
		editing = this.state.edit;
		currentUser = this.state.arrayEdit;
		
		const columns = [
		  { name: 'ID', options: {filter: false} },
		  { name: 'Nome', options: {filter: false} },
		  { name: 'Usuário', options: {filter: false} },
		  { name: 'E-mail', options: {filter: false} },
		  { name: "Ações", 
			options: {
			  filter: true,
			  customBodyRender: (value, tableMeta, updateValue) => {
				return (
				  <button onClick={() => {
					editButton(tableMeta.rowData)
				  }}
                  className="button muted-button"
				  >Editar</button>
				);
			  }
			}
		  }
		];
		
		const options = {
		  filter: true,
		  filterType: "dropdown",
		  responsive: "scroll"
		};
		
		return (
			<div className={classes.root}>
				<AppBar position="static">
					  <Toolbar>
						<IconButton edge="start" className="" color="inherit" aria-label="menu">
						  <MenuIcon />
						</IconButton>
						<Typography variant="h6" className="">
						  ReactJS App
						</Typography>
					  </Toolbar>
				</AppBar>
				
				<button type="button" className="button" onClick={() => { addButton() }}>Adicionar</button>
								
				<MUIDataTable
				title={"Lista de Usuários"}
				data={data}
				columns={columns}
				options={options}
				/>
				
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={open}
					onClose={handleClose}
				>
					<div className="modal">
						{editing ? (
							<Fragment>
								<h2 id="simple-modal-title">Editar Usuário</h2>
								<div id="simple-modal-description">
									<EditUserForm
										editing={editing}
										currentUser={currentUser}
										updateUser={updateUser}
									/>
								</div>
							</Fragment>
						) : (
							<Fragment>
								<h2 id="simple-modal-title">Adicionar Usuário</h2>
								<div id="simple-modal-description">
									<AddUserForm addUser={addUser} />
								</div>
							</Fragment>
						)}	
					</div>
				</Modal>
			</div>
		);
	}
}
export default withStyles(styles)(App);