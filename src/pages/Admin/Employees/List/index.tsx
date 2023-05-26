import Pagination from 'components/Pagination';
import EmployeeCard from 'components/EmployeeCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { Employee } from 'types/employee';
import { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';

import './styles.css';


const List = () => {

  const [page, setPage] = useState<SpringPage<Employee>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/employees/',
      baseURL: BASE_URL,
      params: {
        page: 0,
        size: 4
      },
      withCredentials: true,

    };

    requestBackend(params)
      .then(response => {
        setPage(response.data);
        console.log(page);
      });

  }, []);

  const handlePageChange = (pageNumber: number) => {
    // to do
  };

  return (
    <>
      <Link to="/admin/employees/create">
        <button className="btn btn-primary text-white btn-crud-add">
          ADICIONAR
        </button>
      </Link>

      {page?.content.map(employee => {
        return (
          <EmployeeCard employee={employee} />
        );
      })}


      <Pagination
        forcePage={0}
        pageCount={1}
        range={3}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
