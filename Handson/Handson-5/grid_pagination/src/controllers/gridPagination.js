import React, { Component } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import './gridPagination.css';

export default class GridPagination extends Component {
    constructor(){
        super();
             this.state = {dataList:[],curList:[],activePage:1,pageStart:1,pageEnd:4};
        }

    componentDidMount()
    {
        fetch('http://dummy.restapiexample.com/api/v1/employees',{
            headers: { 'Accept': 'application/json' }
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({dataList:data.data})
            let tempList=[...this.state.dataList];
            let curlist=tempList.slice(0,5)
            this.setState({curList:curlist});
        })
    }

    currentPage(currentpage){
        this.setState({activePage:currentpage})
        let tempList=[...this.state.dataList];
        this.setState({curList:tempList.slice((currentpage*5)-5,currentpage*5)});
    }
    prevPage(pageStart,pageEnd){
        if(pageStart > 4){
            this.setState({pageStart: pageStart-4,pageEnd: pageEnd-4})}
    }
    nextPage(pageStart,pageEnd){
            this.setState({pageEnd: pageEnd+4,pageStart:pageStart+4})
    }

      render()
      {
        console.log(this.state.curList)
        if(this.state.curList.length){
            var GridData=this.state.curList.map((curData,i)=>{
                return (
                <tr key={i}>
                    <td>{curData.employee_name}</td>
                    <td>{curData.id}</td>
                    <td>{curData.employee_salary}</td>
                    <td>{curData.employee_age}</td>
                </tr>);
            })
        }else if(this.state.curList.length === 0 & this.state.pageStart !== 1){
            var GridData = <tr key={"noData"}>{"No more records available ! 😒"}</tr>
        }
      
        var items = [1,1,1,1,1,1];
        items[0] = <Pagination.Item key={"prev"} onClick={this.prevPage.bind(this,this.state.pageStart,this.state.pageEnd)}>{"Prev"}</Pagination.Item>;
        var k=1;
        for (let i = this.state.pageStart; i <= this.state.pageEnd; i++) {
            items[k]= <Pagination.Item key={i}  active={i === this.state.activePage} onClick={this.currentPage.bind(this,i)}>
                           {i}
                       </Pagination.Item>
                        k=k+1;
        }
        items[5]= <Pagination.Item key={"next"} onClick={this.nextPage.bind(this,this.state.pageStart,this.state.pageEnd)}>{"Next"}</Pagination.Item>
     
        return (
            <div className="grid">
                <h4 className="handson-title">Fetch API and Pagination</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Id</th>
                            <th>Employee Salary</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {GridData}
                    </tbody>
                </table>
               <Pagination className="pagination-right">{items}</Pagination> 
            </div>
        )
    }
}
