import React from "react";
import ReactTable from "react-table";
import { Button } from "mdbreact";
import CollectDetails from "./CollectDetails"
import "./CollectsTable.css";
import "react-table/react-table.css";

class CollectsTable extends React.Component {
  state = {
    data: [],
    pages: null,
    loading: true,
    columns: [],
    filtered: this.props,
    selectedRow: null,
    selectedImage: null,
    expanded: {}
  };

  fetchData = state => {
    // show the loading overlay
    this.setState({ loading: true });

    let query = `pageSize=${state.pageSize}&page=${state.page}`;

    if (state.sorted !== undefined && state.sorted.length > 0) {
      query += `&sorted=${state.sorted[0].id}&order=${
        state.sorted[0].desc ? "desc" : "asc"
      }`;
    }

    if (this.props.mapData.length) {
      const mapBbox = encodeURI(
        `BBOX(the_geom, ${this.props.mapData.toString()})`
      );
      query += `&filter=${mapBbox}`;
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
  };

  componentDidMount() {
    let _this = this;
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
      })
      .catch(error => console.error("Something bad happened"));
  }

  pullAllImagery= (prefix) => {
    console.log(`Pull imagery for: ${prefix}`);
  }

  getNewData() {
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
          // getTdProps={(state, rowInfo, column, instance) => {
          //   return {
          //     onClick: (e, handleOriginal) => {
          //       let pull = confirm(
          //         `Pull image ${rowInfo.original.prefix} from S3?`
          //       );
          //       if (pull) {
          //         this.pullImage(rowInfo.original.prefix);
          //       } else {
          //         return;
          //       }

          //       // IMPORTANT! React-Table uses onClick internally to trigger
          //       // events like expanding SubComponents and pivots.
          //       // By default a custom 'onClick' handler will override this functionality.
          //       // If you want to fire the original onClick handler, call the
          //       // 'handleOriginal' function.
          //       if (handleOriginal) {
          //         handleOriginal();
          //       }
          //     }
          //   };
          // }}
          // getTrProps={(state, rowInfo) => {
          //   if (rowInfo && rowInfo.row) {
          //     return {
          //       onClick: e => {
          //         this.setState({
          //           selectedRow: rowInfo.index,
          //           selectedImage: rowInfo.original.prefix
          //         });
          //       },
          //       style: {
          //         background:
          //           rowInfo.index === this.state.selectedRow ? "#33b5e5" : "white",
          //         color:
          //           rowInfo.index === this.state.selectedRow ? "white" : "black"
          //       }
          //     };
          //   } else {
          //     return {};
          //   }
          // }}
          expanded={this.state.expanded}
          onExpandedChange={(newExpanded, index, event) => {
            if (newExpanded[index[0]] === false) {
                newExpanded = {}
            } else {
                Object.keys(newExpanded).map(k => {
                    newExpanded[k] = parseInt(k) === index[0] ? {} : false
                })
            }
            this.setState({
                expanded: newExpanded
            })
          }}
          SubComponent={row => {
            return (
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <Button onClick={() => this.pullAllImagery(row.original.prefix)} color="default">Pull All Files</Button>
                  <CollectDetails prefix={row.original.prefix}/>
                </div>
              </div>
            );
          }}
          ref={refReactTable => {
            this.refReactTable = refReactTable;
          }}
        />
      </div>
    );
  }
}

export default CollectsTable;
