import axios from 'axios';
import members from '../members.json'
import React, { Component } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';
import { OutlinedInput } from '@mui/material'

//make accordian of members names and chips count
//make POST request to api to update split based of chatGPT algorithm

class PlayerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      chips: null,
      buyCount: 1,
      playerNameUpdateDisable: false
    }
  }

  componentDidMount = async() => {
    
  }

  handlePlayerChange = (event) => {
    let correspondingId;
    for(let member of members.members) {
      if(member.name === event.target.value) {
        correspondingId = member.id;
      }
    }
    this.setState({
      name: event.target.value,
      id: correspondingId,
      playerNameUpdateDisable: true
    }, () => {
      this.props.onPlayerUpdate(this.state);
    })
  }

  handleChipsChange = (event) => {
    let correspondingId;
    for(let member of members.members) {
      if(member.name === this.state.name) {
        correspondingId = member.id;
      }
    }
    this.setState({
      chips: event.target.value,
      id: correspondingId
    }, () => {
      this.props.onPlayerUpdate(this.state);
    })
  }

  handleBuyInCountChange = (event) => {
    let correspondingId;
    for(let member of members.members) {
      if(member.name === this.state.name) {
        correspondingId = member.id;
      }
    }
    this.setState({
      buyCount: event.target.value,
      id: correspondingId
    }, () => {
      this.props.onPlayerUpdate(this.state);
    })
  }

  render () {
    //console.log("state", this.state)
    return (
        <div style={{ marginTop: "0px"}}>
            <FormControl sx={{ m: 1, minWidth: 350 }} size="small">
              <InputLabel id="demo-simple-select-helper-label">Player</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={this.state.name}
                  label="Player"
                  onChange={this.handlePlayerChange}
                  disabled={this.state.playerNameUpdateDisable}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                
                {members.members.map((item, i) => (
                  <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                ))}

                </Select>
                {!this.state.playerNameUpdateDisable && (<FormHelperText>Select player name</FormHelperText>)}
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                <InputLabel id="demo-simple-select-helper-label">Chips</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  label="Amount"
                  value={this.state.chips}
                  onChange={this.handleChipsChange}
                  disabled={!this.state.playerNameUpdateDisable}
                />
                {this.state.playerNameUpdateDisable && (<FormHelperText>Enter chips value</FormHelperText>)}
            </FormControl>

            <FormControl sx={{ m: 1}} size="small" style={{ marginLeft: "60px"}}>
              <InputLabel htmlFor="outlined-adornment-amount">Buy-in</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                label="buy-in"
                value={this.state.buyCount}
                onChange={this.handleBuyInCountChange}
                disabled={!this.state.playerNameUpdateDisable}
              />
              {this.state.playerNameUpdateDisable && (<FormHelperText>Enter number of buy-ins</FormHelperText>)}
            </FormControl>
        </div>
    )
  }
}

export default PlayerDetail;