import React from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


const requestData = (pageSize, page, sorted, filtered) => {
  console.log('sorted', sorted);
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.

   let query = `pageSize=${pageSize}&page=${page}`;

   if ( sorted !== 'undefined' && sorted.length > 0) {
        query += `&sorted=${sorted[0].id}&order=${sorted[0].desc ? 'desc' : 'asc'}`;
   }

   if ( filtered !== 'undefined' && filtered.length > 0 )  {
        let f = filtered.map( foo => `${foo.id} like '%${foo.value}%'`).join( ' and ');

        f = encodeURI(f);
        query += `&filtered=${f}`;

   }


console.log('query', query);


   fetch(`/collects/getData?${query}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
       console.log('fetched', json);
       const res = {
          rows: json.data,
          pages: json.pages
        };
        resolve(res);
      })
      .catch(error =>
        console.error(
            "Something bad happened"
        )
      );
  });
};

class CollectsTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true,
      columns: []
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(state, instance) {
    console.log('fetchData');
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      console.log('promised', res)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }
  componentDidMount() {
    let _this = this;
    fetch('/collects/getData', {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(collectJson => {
        _this.setState( {columns: collectJson.columns });
        console.log(_this.state);
        })
        .catch(error =>
            console.error(
                "Something bad happened"
        )
    );
  }
  render() {
    const { data, pages, loading } = this.state;
    return (
      <div>
        <ReactTable
          columns={this.state.columns}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchData} // Request new data when things change
          filterable
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default CollectsTable;
