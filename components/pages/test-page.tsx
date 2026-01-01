"use client"

import api from "@/lib/api"
import axios from "axios";

const TestPage = () => {
    const test = async() => {
        const res = await api.post('http://localhost:8000/test',{
            message: 'gi',
            convId:'sss'
        });
    }
    return(
        <div>
            <button onClick={test}>날 눌러</button>
        </div>
    )
}

export default TestPage;