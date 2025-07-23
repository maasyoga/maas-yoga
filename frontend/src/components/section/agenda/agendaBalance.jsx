import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../context/Context";
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Table from "../../table";
import CustomCheckbox from "../../checkbox/customCheckbox";
import TableSummary from '../../table/summary'
import ChartSelector from '../../chartSelector'
import AgendaChart from '../../chart/agenda'
import SelectAgendaLocations from "../../select/selectAgendaLocations"

export default function AgendaBalance() {
    const [currentChartSelected, setCurrentChartSelected] = useState("month");
    const [selectedAgendaLocation, setSelectedAgendaLocation] = useState('');

    return(<>
        <div className={"mb-4"}>
            <SelectAgendaLocations value={selectedAgendaLocation} onChange={setSelectedAgendaLocation}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-4 mb-14">
            <div className="col-span-1">
                <ChartSelector allowWeek={false} allowYear={false} currentChartSelected={currentChartSelected} onChange={(newValue) => setCurrentChartSelected(newValue)}/>
            </div>
            <div className="col-span-3">
                <AgendaChart location={selectedAgendaLocation.id === 'all' ? null : selectedAgendaLocation.id} currentChartSelected={currentChartSelected}/>
            </div>
        </div>
    </>);
} 