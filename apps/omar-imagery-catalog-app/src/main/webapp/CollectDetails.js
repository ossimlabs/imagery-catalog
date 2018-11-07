import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button } from "mdbreact";

const mockData = [{
  "preview": "https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?&filename=/data/s3/o2-test-data/b9a34414-adc1-4510-a8e3-9812eae321b3/17MAR20054817-M1BS-056599362010_01_P004.NTF&id=12721&entry=0&size=114&outputFormat=png&transparent=true&padThumbnail=false",
  "path": "I00000111174_01/",
  "type": ".tif",
  "size": 4829
}, {
  "preview": "https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?&filename=/data/MattIsNotImpressed/MattIsNotImpressed.tif&id=15153&entry=0&size=114&outputFormat=png&transparent=true&padThumbnail=false",
  "path": "I00000111174_01/",
  "type": ".tif",
  "size": 9646
}, {
  "preview": "https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?&filename=/data/harvey/2017-08-31/105001000B95E100/3002221.tif&id=3317&entry=0&size=114&outputFormat=png&transparent=true&padThumbnail=false",
  "path": "I00000111174_01/",
  "type": ".ntf",
  "size": 1564
}, {
  "preview": "https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?&filename=/data/harvey/2017-09-01/1030010070C13600/3030020.tif&id=3284&entry=0&size=114&outputFormat=png&transparent=true&padThumbnail=false",
  "path": "I00000111174_01/",
  "type": ".tif",
  "size": 6756
}, {
  "preview": "https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?&filename=/data/LongBeach/17AUG30185534-P1BS-057097509010_01_P001.NTF&id=4557&entry=0&size=114&outputFormat=png&transparent=true&padThumbnail=false",
  "path": "I00000111174_01/",
  "type": ".tif",
  "size": 6739
}, {
  "preview": "https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?&filename=/data/harvey/2017-09-01/1030010070C13600/3030202.tif&id=3294&entry=0&size=114&outputFormat=png&transparent=true&padThumbnail=false",
  "path": "I00000111174_01/",
  "type": ".ntf",
  "size": 4984
}, {
  "preview": "https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?&filename=/data/harvey/2017-08-31/105001000B95E100/3020030.tif&id=3336&entry=0&size=114&outputFormat=png&transparent=true&padThumbnail=false",
  "path": "I00000111174_01/",
  "type": ".ntf",
  "size": 6423
}, {
  "preview": "https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?&filename=/data/harvey/2017-08-31/105001000B95E200/3020110.tif&id=3409&entry=0&size=114&outputFormat=png&transparent=true&padThumbnail=false",
  "path": "I00000111174_01/",
  "type": ".ntf",
  "size": 1184
}, {
  "preview": "https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?&filename=/data/harvey/2017-08-31/105001000B95E100/3020030.tif&id=3336&entry=0&size=114&outputFormat=png&transparent=true&padThumbnail=false",
  "path": "I00000111174_01/",
  "type": ".ntf",
  "size": 8939
}, {
  "preview": "https://omar-dev.ossim.io/omar-oms/imageSpace/getThumbnail?&filename=/data/harvey/2017-08-31/105001000B95E100/3002221.tif&id=3317&entry=0&size=114&outputFormat=png&transparent=true&padThumbnail=false",
  "path": "I00000111174_01/",
  "type": ".tif",
  "size": 1051
}]

class CollectDetails extends React.Component {

    constructor() {
      super();
      this.state = {
        data: mockData
      };
    }
    pullImage = (image) => {
      console.log(`Pull image ${image}`);
    }
    render(){
      const { data } = this.state;
      return (
        <div>
            <ReactTable
              data={data}
              columns={[
                {
                  Header: "Preview",
                  accessor: "preview",
                  Cell: row => <img src={row.original.preview} />
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
                },
                {
                  Header: 'Pull',
                  Cell: row => <Button onClick={() => this.pullImage(row.original.path)} color="primary">Pull File</Button>
                }
              ]}
              defaultPageSize={10}
            />
        </div>)
    }
}

export default CollectDetails;