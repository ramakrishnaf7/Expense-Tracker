import React from 'react'
import {Progress} from 'antd'

//category
const category = ['salary','tip','project','food','movie','bills','medical','fee','tax'];


const Analytics = ({alltransections}) => {
    const totalTransections = alltransections.length
    const totalIncomeTransections = alltransections.filter(transection => transection.type === 'income')
    const totalExpenseTransections = alltransections.filter(transection => transection.type === 'expense')
    const totalIncomePercent = (totalIncomeTransections.length / totalTransections) * 100;
    const totalExpensePercent = (totalExpenseTransections.length / totalTransections) * 100;

    const totalTurnover = alltransections.reduce((acc,transection) => acc + transection.amount,0);
    const totalIncomeTurnover = alltransections.filter((transection) => transection.type === 'income').reduce((acc,transection) => acc + transection.amount,0);
    const totalExpenseTurnover = alltransections.filter((transection) => transection.type === 'expense').reduce((acc,transection) => acc + transection.amount,0);

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
        <div className='row m-3'>
            <div className='col-md-3'>
                <div className='card'>
                    <div className='card-header'>
                        Total Transections : {totalTransections}
                    </div>
                    <div className='card-body'>
                        <h5 className='text-success'>Income:{totalIncomeTransections.length}</h5>
                        <h5 className='text-danger'>Expense:{totalExpenseTransections.length}</h5>
                        <Progress type = 'circle' strokeColor={'green'} className='mx-2 mt-3' percent={totalIncomePercent.toFixed(0)}/>
                        <Progress type = 'circle' strokeColor={'red'} className='mx-2 mt-3' percent={totalExpensePercent.toFixed(0)}/>
                    </div>
                    
                </div>

            </div>

            <div className='col-md-3'>
                <div className='card'>
                    <div className='card-header'>
                        Total Turnover : {totalTurnover}
                    </div>
                    <div className='card-body'>
                        <h5 className='text-success'>Income:{totalIncomeTurnover}</h5>
                        <h5 className='text-danger'>Expense:{totalExpenseTurnover}</h5>
                        <Progress type = 'circle' strokeColor={'green'} className='mx-2 mt-3' percent={totalIncomeTurnoverPercent.toFixed(0)}/>
                        <Progress type = 'circle' strokeColor={'red'} className='mx-2 mt-3' percent={totalExpenseTurnoverPercent.toFixed(0)}/>
                    </div>
                </div>

            </div>
            <div className='col-md-3'>
                <h4>Category Wise Income</h4>
                {
                    category.map(category => {
                        const amount = alltransections.filter(
                            (transection) => transection.type === 'income' && transection.category === category)
                            .reduce(
                            (acc,transection) => acc+transection.amount,0
                            );
                        return (
                            amount > 0 && (
                            <div className='card'>
                                <div className='card-body'>
                                    <h5>{category}</h5>
                                    <Progress strokeColor={'black'} percent={((amount/totalIncomeTurnover) * 100).toFixed(0)} />    
                                </div>
                            </div>
                            )
                        );
                    })
                }
            </div>
       
        <div className='col-md-3'>
            <h4>Category Wise Expense</h4>
            {
                category.map(category => {
                    const amount = alltransections.filter(
                        (transection) => transection.type === 'expense' && transection.category === category)
                        .reduce(
                        (acc,transection) => acc+transection.amount,0
                        );
                    return (
                        amount > 0 && (
                        <div className='card'>
                            <div className='card-body'>
                                <h5>{category}</h5>
                                <Progress strokeColor={'black'} percent={((amount/totalExpenseTurnover) * 100).toFixed(0)} />    
                            </div>
                        </div>
                        )
                    );
                })
            }
        </div>
        </div>
    </>
  )
}

export default Analytics