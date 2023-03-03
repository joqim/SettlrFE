import { Header } from './components/Header';
import axios from 'axios';
import React, { Component } from 'react';
import BuyInDetail from './components/BuyInDetail';
import PlayerDetail from './components/PlayerDetail';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';


//make accordian of members names and chips count
// make POST request to api to update split based of chatGPT algorithm

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerCount: 2,
      members: [],
      buyInAmount: null,
      preparedMembersArray: [],
      totalMoneyPaid: 0
    }
  }

  componentDidMount = async() => {
    // await axios.get("http://127.0.0.1:5000").then(res => {
    //   console.log("res", res);
    // })
  }

  handlePlayerCountUpdate = (count) => {
    this.setState({ playerCount: count });
  }

  handleBuyInCountUpdate = (amount) => {
    this.setState({ buyInAmount: amount })
  }

  upsert = (array, element) => { // (1)
    const i = array.findIndex(_element => _element.id === element.id);
    if (i > -1) array[i] = element; // (2)
    else array.push(element);
  }

  handlePlayerUpdate = (member) => {
    console.log("member in parent", member);

    let membersArray = this.state.members;
    this.upsert(membersArray, member)

    this.setState({
      members: membersArray
    })
  }

  handleSplitwiseUpdate = async () => {
    //formula for one person
    let preparedMembersArray = [];
    let totalMoneyPaid = 0;
    for(let member of this.state.members) {
      let memberObject = {};
  
      let totalBuyInAmount = this.state.buyInAmount;
      let numberOfBuyIns = member.buyCount;
      let totalChipValue = numberOfBuyIns*1000;
  
      let chipsWalkedAwayWith = member.chips - totalChipValue;
      let totalMoneyWalkedAwayWith = ((chipsWalkedAwayWith/1000)*totalBuyInAmount).toFixed(2);
      console.log("totalMoneyWalkedAwayWith", totalMoneyWalkedAwayWith);

      memberObject.name = member.name;
      memberObject.id = member.id;
      memberObject.money = totalMoneyWalkedAwayWith;
      preparedMembersArray.push(memberObject);

      if(totalMoneyWalkedAwayWith > 0) {
        totalMoneyPaid += parseFloat(totalMoneyWalkedAwayWith);
        console.log("totalMoneyPaid", totalMoneyPaid)
      }
    }

    console.log("preparedMembersArray", preparedMembersArray)

    this.setState({
      preparedMembersArray,
      totalMoneyPaid
    }, async () => {
      await axios.post("http://127.0.0.1:5000/update", this.state).then(res => {
        console.log("res", res);
      })
    })
  }

  handleTest = async() => {
    await axios.get("http://127.0.0.1:5000/", this.state).then(res => {
      console.log("res", res);
    })
  }

  render () {
    console.log("members in App", this.state.members);
    const theme = createTheme({
      palette: {
        splitwise: {
          main: '#008B8B',
          contrastText: '#fff',
        },
      },
    });

    return (
      <div>
        <Header />
        <div style={{ marginTop: "60px", marginLeft: "100px"}}>
          <BuyInDetail onPlayerCountUpdate={this.handlePlayerCountUpdate} onBuyInAmountUpdate={this.handleBuyInCountUpdate}/>
          {[...Array(this.state.playerCount)].map((e, i) => <PlayerDetail key={i} onPlayerUpdate={this.handlePlayerUpdate}/>)}
          
          <ThemeProvider theme={theme}>
            <Button 
              color="splitwise" 
              variant="contained" 
              style={{ marginTop: "30px", marginLeft: "10px", marginBottom: "20px"}}
              onClick={() => this.handleSplitwiseUpdate()}
              >
              Splitwise Update
            </Button>

            {/* <Button 
              color="splitwise" 
              variant="contained" 
              style={{ marginTop: "30px", marginLeft: "10px", marginBottom: "20px"}}
              onClick={() => this.handleTest()}
              >
              TEST
            </Button> */}
          </ThemeProvider>
          
        </div>
      </div>
    )
  }
}

export default App;