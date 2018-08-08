// const React =  require("react");
// const ReactDOM =  require("react-dom");
import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class FilteredList extends React.Component {

  constructor() {
    super();
    this.state = {
      kits : []
    }
  }

  componentWillMount(){
      var thiss = this
      return axios.get('/api').then(function(res) {
      thiss.setState(
        {kits : res.data,
        allKits : res.data}
      )
    });
  }

  filterList(event){
    let kits = this.state.allKits;
    let updatedList = kits.filter(function(kit){
      console.log(kit)
      if (kit.keywords.search(event.target.value.toLowerCase()) !== -1){
        return kit
      }
    });
    this.setState({kits: updatedList});
  }

  render(){
    return (
      <div className="filter-list">
        <form>
        <fieldset className="form-group">
        <input type="text" className="form-control form-control-lg" placeholder="Type to search..." onChange={this.filterList.bind(this)}/>
        </fieldset>
        </form>
      <List kits={this.state.kits}/>
      </div>
    );
  }

}

class List extends React.Component {
  render(){
    return (
      <div className="col-xs-12 results-container">
      {
        this.props.kits.map(function(kit) {
          return <div className="col-md-4 col-sm-6 col-xs-12" data-category={kit.title} key={kit.link}>
                    <a href={"/../../../kit/" + kit.link}>
                      <div className="kit-index-block">{kit.title} </div>
                    </a>
                 </div>;
        })
       }
      </div>
    )
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<FilteredList/>, document.getElementById('app'));
}
