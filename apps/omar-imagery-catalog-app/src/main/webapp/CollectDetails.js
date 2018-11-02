import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const mockData = [{
  "preview": "http://dummyimage.com/100x100.png/dddddd/000000",
  "path": "I00000111174_01/",
  "type": ".tif",
  "size": 4829
}, {
  "preview": "http://dummyimage.com/100x100.png/dddddd/000000",
  "path": "I00000111174_01/",
  "type": ".tif",
  "size": 9646
}, {
  "preview": "http://dummyimage.com/100x100.png/dddddd/000000",
  "path": "I00000111174_01/",
  "type": ".ntf",
  "size": 1564
}, {
  "preview": "http://dummyimage.com/100x100.png/dddddd/000000",
  "path": "I00000111174_01/",
  "type": ".tif",
  "size": 6756
}, {
  "preview": "http://dummyimage.com/100x100.png/dddddd/000000",
  "path": "I00000111174_01/",
  "type": ".tif",
  "size": 6739
}, {
  "preview": "http://dummyimage.com/100x100.png/dddddd/000000",
  "path": "I00000111174_01/",
  "type": ".ntf",
  "size": 4984
}, {
  "preview": "http://dummyimage.com/100x100.png/dddddd/000000",
  "path": "I00000111174_01/",
  "type": ".ntf",
  "size": 6423
}, {
  "preview": "http://dummyimage.com/100x100.png/dddddd/000000",
  "path": "I00000111174_01/",
  "type": ".ntf",
  "size": 1184
}, {
  "preview": "http://dummyimage.com/100x100.png/dddddd/000000",
  "path": "I00000111174_01/",
  "type": ".ntf",
  "size": 8939
}, {
  "preview": "http://dummyimage.com/100x100.png/dddddd/000000",
  "path": "I00000111174_01/",
  "type": ".tif",
  "size": 1051
}]

class CollectDetails extends React.Component {

    constructor(props) {
      super();
      this.state = {
        data: mockData
      };
    }

    render(){
      let { data } = this.state;
      console.log('data', data );
      data = data.map((row) => {
        console.log('row in map:', row);
        row.ImgPath = row.preview;
        return row;
      })
      return (
        <div>
            <ReactTable
              data={ data }
              columns={[
                {
                  Header: "Preview",
                  accessor: "preview",
                  Cell: (row) => {
                    console.log(row);
                    return (
                      <div>
                        <img src={row.original.ImgPath} />
                      </div>)
                  }
                },
                {
                  Header: "Path",
                  accessor: "path"
                },
                {
                  Header: "Type",
                  accessor: "type"
                },
                {
                  Header: 'Size',
                  accessor: 'size'
                }
              ]}
            />
        </div>)
    }
}

export default CollectDetails;