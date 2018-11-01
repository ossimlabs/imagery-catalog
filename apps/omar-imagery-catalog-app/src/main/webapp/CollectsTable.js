import React from "react";
import ReactTable from "react-table";
import "./CollectsTable.css";
import "react-table/react-table.css";


class CollectsTable extends React.Component {

  state = {
    data: [],
    pages: null,
    loading: true,
    columns: [],
    filtered: this.props,
  };

  fetchData = (state) => {

    // show the loading overlay
    this.setState({loading: true})
    //console.log('state: ', state);

    let query = `pageSize=${state.pageSize}&page=${state.page}`;

    if (state.sorted !== undefined && state.sorted.length > 0) {
      query += `&sorted=${state.sorted[0].id}&order=${
        state.sorted[0].desc ? "desc" : "asc"
      }`;
    }

    // if (filtered !== undefined && filtered.length > 0) {
    //   let f = filtered
    //     .map(filter => `${filter.id} like '%${filter.value}%'`)
    //     .join(" and ");

    //   f = encodeURI(f);
    //   query += `&filtered=${f}`;
    // }

    //console.log('PROPS ===', this.props.mapData.toString());
    //const mapBbox = `BBOX(the_geom, ${this.props.mapData.toString()})`;
    //console.log('mapBbox: ', mapBbox);

    console.log('PROPS ===', this.props.mapData);
    if(this.props.mapData.length){
      const mapBbox = encodeURI(`BBOX(the_geom, ${this.props.mapData.toString()})`);
      console.log('mapBbox: ', mapBbox);
      query += `&filter=${mapBbox}`
    }



    fetch(`/collects/getData?${query}`)
      .then(function(response) {
        return response.json();
      })
      .then(json => {

        this.setState({
          data: json.data,
          pages: json.pages,
          loading: false
        });

      })
      .catch(error => console.error(`Something bad happened: ${error}`));

  }

  componentDidMount() {
    let _this = this;
    //console.log('this.props in componentDidMount(): ', this.props)
    fetch("/collects/getData", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(collectJson => {
        _this.setState({ columns: collectJson.columns });
        //console.log(_this.state);
      })
      .catch(error => console.error("Something bad happened"));
  }

  // componentDidUpdate(prevProps, prevState){
  //   if(this.props !== prevProps.mapBbox) {
  //     //console.log('props !== prevProps');
  //     let _this = this;
  //     // TODO: This is where we need to execute the new query,
  //     //       and pass in the new mapBbox
  //     //_this.refReactTable.fireFetchData();
  //   }
  // }
  getNewData() {
    console.log('Calling getNewData() in the child');
    this.refReactTable.fireFetchData();
  }
  render() {
    const { columns, data, pages, loading } = this.state;

    return (

      <div id="collectsTable">
        <ReactTable
          columns={columns}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchData} // Request new data when things change
          defaultPageSize={10}
          className="-striped -highlight"
          ref={(refReactTable) => {this.refReactTable = refReactTable;}}
        />
      </div>
    );
  }
}

export default CollectsTable;
