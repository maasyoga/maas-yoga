import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../context/Context";
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Table from "../../table";
import CustomCheckbox from "../../checkbox/customCheckbox";
import TableSummary from '../../table/summary'
import SelectAgendaLocations from '../../select/selectAgendaLocations'

export default function AgendaPayments() {

    const { getAgendaCashValues } = useContext(Context);
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
    const [selectedAgendaLocation, setSelectedAgendaLocation] = useState('');
    const [agendaCashValues, setAgendaCashValues] = useState([])
    const [accreditedOnly, setAccreditedOnly] = useState(true)
    const [localAgendaCashValues, setLocalAgendaCashValues] = useState([])

    useEffect(() => {
        const fetchData = async (year, month, location) => {
            setAgendaCashValues(await getAgendaCashValues(year, month, location));
        }
        if (selectedAgendaLocation != '' && selectedDate) {
            const year = selectedDate.$d.getFullYear();
            const month = selectedDate.$d.getMonth() +1;
            const location = selectedAgendaLocation.value == 'all' ? null : selectedAgendaLocation.value;
            fetchData(year, month, location)
        }
    }, [selectedAgendaLocation, selectedDate]);

    useEffect(() => {
        setLocalAgendaCashValues(agendaCashValues.filter(cashValue => {
            if (accreditedOnly)
                return cashValue.acreditado == '1'
            else
                return cashValue.acreditado == '0'
            
        }))
    }, [accreditedOnly, agendaCashValues])

    const getTotalCash = () => localAgendaCashValues.reduce((total, cashValue) => total + parseFloat(cashValue.valor), 0)

    const columns = [
        {
            name: 'Valor',
            cell: row => "$" + row.valor,
            sortable: true,
            searchable: true,
            selector: row => row.valor,
        },
        {
            name: 'Acreditado',
            maxWidth: '80px',
            cell: row => row.acreditado == '0' ? 'No' : 'Si',
            selector: row => row.acreditado,
            sortable: true,
            searchable: false,
        },
        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            cell: (row) => (<><div className="flex flex-col justify-center">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="group relative inline-block text-yellow-900 mx-1">{row.descripcion}
                <div className="opacity-0 w-28 bg-orange-200 text-gray-700 text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 ml-14 px-3 pointer-events-none">
                  {row.descripcion}
                  <svg className="absolute text-orange-200 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                </div>
              </div>
            </div>
            </div></>),
            sortable: true,
            searchable: true,
        },
        {
            name: 'Fecha',
            selector: row => row.fecha,
            sortable: true,
            maxWidth: '180px',
            searchable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
            searchable: true,
        },
        {
            name: 'Apellido',
            selector: row => row.apellido,
            sortable: true,
            searchable: true,
        },
    ];

    return(<>
        <div className="flex w-full mb-4">
            <div className="w-4/12 pr-2">
                <SelectAgendaLocations value={selectedAgendaLocation} onChange={setSelectedAgendaLocation}/>
            </div>
            <div className="w-4/12">
                <DateTimePicker
                    views={['year', 'month']}
                    label="Seleccionar fecha"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    className="w-full"
                />
            </div>
            <div className="w-4/12">
                <label style={{paddingLeft: "9px"}}>Acreditado</label>
                <CustomCheckbox className="p-0" labelOn={"Si"} labelOff={"No"} onChange={() => setAccreditedOnly(!accreditedOnly)} checked={accreditedOnly}/>
            </div>
        </div>
        <Table
            columns={columns}
            data={localAgendaCashValues}
            pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
            responsive
        />
        <TableSummary total={getTotalCash()} incomes={getTotalCash()} expenses={0}/>
    </>);
} 