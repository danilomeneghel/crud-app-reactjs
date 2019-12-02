import React, { useState, useEffect  } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import MUIDataTable from "mui-datatables";

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
			  { name: 'ID', options: {filter: false} },
			  { name: 'Nome', options: {filter: false} },
			  { name: 'Usuário', options: {filter: false} },
			  { name: 'E-mail', options: {filter: false} },
			  { name: "Ações", 
				options: {
				  filter: true,
				  customBodyRender: (value, tableMeta, updateValue) => {
					return (
					  <button type="button">Editar</button>
					);
				  }
				}
			  }
			];
	  this.state = { columns: columns, results: [] };
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
		const data = this.state.results.map(result => [result.id, result.name, result.username, result.email, ""]);
		const columns = this.state.columns;
		
		const options = {
		  filter: true,
		  filterType: "dropdown",
		  responsive: "scroll"
		};

		return (
			<div>
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
				<MUIDataTable
				title={"Lista de Usuários"}
				data={data}
				columns={columns}
				options={options}
				/>
			</div>
		);
	}
}
