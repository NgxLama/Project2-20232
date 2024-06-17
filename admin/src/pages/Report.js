import { useState, useEffect } from 'react';
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';
import { getAllMovie } from '../services/API';
import { Table } from 'react-bootstrap';
import ReportComponent from '../components/ReportComponent';

export default function Report() {
    const [show, setShow] = useState(false);
    const [movies, setMovies] = useState();

    useEffect(() => {
        getAllMovie()
            .then((res) => setMovies(res.data.movies))
            .catch((error) => console.log(error));
    }, []);

    return (

        <div className="d-flex flex-column h-100">
            <SidebarComponent />
            <NavbarComponent />
            <div style={{ marginTop: '70px', marginLeft: '280px' }}>

                <Table striped bordered hover style={{ maxWidth: '98%' }}>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Revenue</th>
                            <th>Amount of seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies && movies.map((movie, index) => (
                            <ReportComponent movie={movie} key={index} />
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>

    )

}