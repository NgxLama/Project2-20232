import { useState, useEffect } from 'react';
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';
import { getAllMovie } from '../services/API';
import { Table } from 'react-bootstrap';
import { getAmount } from '../services/API';

export default function ReportComponent({ movie }) {
    const [amount, setAmount] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {
        getAmount(movie.id)
            .then((res) => {setAmount(res.data.seatCount)
                setTotal(res.data.totalAmount)
            })
            .catch((error) => console.log(error));
    }, []);

    return (
<tr >
<td>{movie.title}</td>
<td>{total}</td>
<td>{amount}</td>
</tr>
    )

}