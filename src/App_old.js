import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import MaterialTable from 'material-table';

const styles = () => ({
  root: {
    flexGrow: 1,
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

export default class App extends React.Component {

	constructor (props) {
	  super(props);
	  const columns = [
			  { title: 'ID', field: 'id' },
			  { title: 'Nome', field: 'name' },
			  { title: 'Usuário', field: 'username' },
			  { title: 'E-mail', field: 'email' }
			];
	  this.state = { columns: columns, result: [] };
	}

	loadContentFromServer() {
	 const url = 'https://jsonplaceholder.typicode.com/users';

	 fetch(url)
	   .then(response => response.json())
	   .then(json => {
		 this.setState({ result: json });
	   });
	}

	componentDidMount() {
	  this.loadContentFromServer();
	}

	render(){
		const data = this.state.result;
		if (!data[0]) return null;
		
		return (
			<div>
				<AppBar position="static">
				  <Toolbar>
					<IconButton edge="start" className="" color="inherit" aria-label="menu">
					  <MenuIcon />
					</IconButton>
					<Typography variant="h6" className="">
					  CRUD ReactJS
					</Typography>
					<Button color="inherit">Login</Button>
				  </Toolbar>
				</AppBar>
				<MaterialTable
				  title="Lista de Usuários"
				  columns={this.state.columns}
				  data={this.state.result}
				  editable={{
					onRowAdd: newData =>
					  new Promise(resolve => {
						setTimeout(() => {
						  resolve();
						  this.setState(prevState => {
							const data = [...prevState.result];
							data.push(newData);
							return { ...prevState, data };
						  });
						}, 600);
					  }),
					onRowUpdate: (newData, oldData) =>
					  new Promise(resolve => {
						setTimeout(() => {
						  resolve();
						  if (oldData) {
							this.setState(prevState => {
							  const data = [...prevState.result];
							  data[data.indexOf(oldData)] = newData;
							  return { ...prevState, data };
							});
						  }
						}, 600);
					  }),
					onRowDelete: oldData =>
					  new Promise(resolve => {
						setTimeout(() => {
						  resolve();
						  this.setState(prevState => {
							const data = [...prevState.result];
							data.splice(data.indexOf(oldData), 1);
							return { ...prevState, data };
						  });
						}, 600);
					  }),
				  }}
				/>
			</div>
		);
	}
}
