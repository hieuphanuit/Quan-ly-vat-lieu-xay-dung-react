import React from "react";
// react-redux components
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { fetchSellingBillDetail, updateSellingBillStatus, reset } from './SellingBillDetailAction';
// react-router-doom components
import { generatePath } from "react-router";

// core components
import SellingBillDetailView from "./SellingBillDetailView.jsx";


class SellingBillDetail extends React.Component {

  constructor(props) {
    //console.log('this is constructor');
    super(props);

    this.state = {
        sellingBillDetails: props.sellingBillDetails,
        customerName: props.customerName,
        customerPhone: props.customerPhone,
        totalBill: props.totalBill,
        totalPaid: props.totalPaid
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    
    this.props.fetchSellingBillDetail(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetching: nextProps.fetching,
      fetched: nextProps.fetched,
      sellingBillDetails: nextProps.sellingBillDetails,
      customerName: nextProps.customerName,
      customerPhone: nextProps.customerPhone,
      totalBill: nextProps.totalBill,
      totalPaid: nextProps.totalPaid,
      fetchSellingBillDetail: (id) => nextProps.fetchSellingBillDetail(id),
      updateSellingBillStatus: (id) => nextProps.updateSellingBillStatus(id),
      reset: () => nextProps.reset(),
      error: nextProps.error
    });
  }

  //------------------- event functions 
  handleSubmit(e, id) {
    this.props.updateSellingBillStatus(id);
  }

  calTotalBill(){
    let total = 0
    this.state.sellingBillDetail.forEach(function(simpleProduct, index) {
      let totalProduct = simpleProduct.price * simpleProduct.quantity;
      total += totalProduct; 
      // this.state.totalBill += totalProduct;
    });
    // console.log('VAT', this.calVAT(total));
    // total += this.calVAT(total);
    this.setState({totalBill: total});
  }

  redirect(e){
    this.props.history.goBack();
  }
  
  render() {
    if (this.props.error) {
      alert(this.props.error);
    }
    const tableOption = {
      actionsColumnIndex: 100,
      headerStyle: {
        textAlign: 'left'
      },
      actionsCellStyle: {
        width: 'fit-content'
      }
    }
    return (
      <SellingBillDetailView
        fetched={this.state.fetched}
        sellingBillDetails={this.state.sellingBillDetails}
        customerName={this.state.customerName}
        customerPhone={this.state.customerPhone}
        totalPaid = { this.state.totalPaid }
        totalBill = { this.state.totalBill }
        handleSubmit={(e, id) => this.handleSubmit(e, id)}
        redirect={e => this.redirect(e)}
      />
    );
  }
}


const mapState = state => ({
  fetching: state.sellingBillDetail.fetching,
  fetched: state.sellingBillDetail.fetched,
  sellingBillDetails: state.sellingBillDetail.sellingBillDetails,
  totalBill: state.sellingBillDetail.totalBill,
  totalPaid: state.sellingBillDetail.totalPaid,
  customerName: state.sellingBillDetail.customerName,
  customerPhone: state.sellingBillDetail.customerPhone,
  error: state.sellingBillDetail.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSellingBillDetail: (id) => dispatch(fetchSellingBillDetail(id)),
    updateSellingBillStatus: (id) => dispatch(updateSellingBillStatus(id)),
    reset: () => dispatch(reset())
  };
}

export default connect(mapState, mapDispatchToProps)(SellingBillDetail);
