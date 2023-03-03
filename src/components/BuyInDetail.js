import axios from 'axios';
import React, { Component } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OutlinedInput } from '@mui/material';
import Typography from '@mui/material/Typography';
import { InputAdornment } from '@mui/material';
import { FormHelperText } from '@mui/material'
import PlayerCount from './PlayerCount';

//make accordian of members names and chips count
// make POST request to api to update split based of chatGPT algorithm

class BuyInDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerCount: 2,
      buyInAmount: null
    }
  }

  componentDidMount = async() => {

  }

  handleBuyInChange = (event) => {
    this.setState({
      buyInAmount: event.target.value,
    }, () => {
      this.props.onBuyInAmountUpdate(this.state.buyInAmount);
    });
  }

  handlePlayerCountUpdate = (count) => {
    this.setState({playerCount: count});
    this.props.onPlayerCountUpdate(count);  
  }

  render () {
    //console.log("state", this.state)
    return (
        <div style={{ marginBottom: "25px"}}>
          <div style={{marginLeft: "10px"}}>Players</div>
          <PlayerCount onPlayerCountUpdate={this.handlePlayerCountUpdate}/>
          <div style={{ marginTop: "20px", display: "inline"}}>
            <FormControl sx={{ m: 1}} size="small">
              <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
                value={this.state.buyInAmount}
                onChange={this.handleBuyInChange}
              />
              <FormHelperText>Enter Buy-in amount</FormHelperText>
            </FormControl>
          </div>
          {/* <div style={{ display: "inline",  }}>
            ${this.state.buyInAmount} gets you 1000 units value in chips
          </div> */}
          <br />
          {/* {this.state.buyInAmount>0 && (
            <Typography variant="caption" gutterBottom style={{marginLeft: "10px"}}>
              ${this.state.buyInAmount} gets you 1000 units value in chips.
            </Typography>
          )} */}
        </div>
        
    )
  }
}

export default BuyInDetail;