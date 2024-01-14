import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { getAllStatuts } from '../../../redux/statutsRedux';
import { useSelector } from 'react-redux';
import styles from './TableForm.module.scss';
const TableForm = ({actionHandle, buttonName, formState}) => {

    const { register, handleSubmit: validate, formState: { errors } } = useForm();   
    const statutsList = useSelector(getAllStatuts); 
    //console.log("statutsList: ", statutsList)

    const [form, setForm] = useState({
        ...formState
    });

    const updateFields = e => {
        //console.log(e.target.value);
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    }

    const actionHandler = e => {
        actionHandle(form);
    }

    return(
        <div  className={styles.smallerForm}>
        <Form onSubmit={validate(actionHandler)}>
            <Form.Group className="mb-3" >
                <Form.Label>Status: </Form.Label>
                <Form.Select id="statusId" 
                {...register("statusId", { required: true})}
                value={form.statusId}  onChange={updateFields} >
                        <option value="">Choose status</option>
                        { statutsList.map(status => <option value={status.id}>{status.statusName}</option>) } 
                    </Form.Select>                 
                {errors.statusId && <small className="d-block form-text text-danger mt-2">This option should be chosen</small>}                
             </Form.Group>        
            <Form.Group className="mb-3">
                <Form.Label>People: </Form.Label>
                <Form.Control type="text" id="peopleAmount" className={styles.smallInput}
                    {...register("peopleAmount", { required: true })}
                    value={form.peopleAmount} onChange={updateFields} />  /                 
                <Form.Control type="text" id="maxPeopleAmount" className={styles.smallInput}
                    value={form.maxPeopleAmount} onChange={updateFields} />               
                {errors.peopleAmount && <small className="d-block form-text text-danger mt-2">This field can't be empty</small>}
            </Form.Group>  
            <Form.Group className="mb-3" >
                <Form.Label>Bill: </Form.Label>
                <Form.Control type="text" id="bill" className={styles.smallInput}
                value={form.bill} onChange={updateFields}  />               
            </Form.Group>                                   
            <Button variant="primary" type="submit">
                {buttonName}
            </Button>                             
        </Form>
        </div>
    );
};

    
export default TableForm;
