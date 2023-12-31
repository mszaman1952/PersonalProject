import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const MonthlyTransition = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBtn = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/createDate");
      const { date } = response.data;
      setCurrentDate(date);
    } catch (error) {
      console.error("Error creating date:", error);
    }
  };

  const handleMonth = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/createMonth");
      const { dateType } = response.data;
      setCurrentMonth(dateType);
    } catch (error) {
      console.error("Error creating month:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/getDate");
        if (response.status === 200) {
          setDate(response.data.getDat);
        } else {
          setDate([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <button onClick={handleBtn} className="btn btn-primary w-25">
          {currentDate ? `${currentDate} Create Today Field` : "Create Today Field"}
        </button>

        <button onClick={handleMonth} className="btn btn-success w-25">
          Create Month
        </button>

        <div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Month:</th>
                <th>{currentMonth}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <div className="row">
        <h1 className="text-center">Ostad Limited</h1>
        <h2 className="text-center">Daily Basis Monthly Business Transition</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className="align-middle text-center">Date</th>
                <th className="align-middle text-center">SL No</th>
                <th className="align-middle text-center">Expense Purpose</th>
                <th className="align-middle text-center">Expense Mode</th>
                <th className="align-middle text-center">Expense</th>
                <th className="align-middle text-center">Expense Refund/Cancel</th>
                <th className="align-middle text-center">Total Expense</th>
                <th className="align-middle text-center">Earning Purpose</th>
                <th className="align-middle text-center">Earning Mode</th>
                <th className="align-middle text-center">Earning</th>
                <th className="align-middle text-center">Earning Refund/Cancel</th>
                <th className="align-middle text-center">Total Earning</th>
                <th className="align-middle text-center">Total In Hand/Cash</th>
                <th className="align-middle text-center">Total Cheque</th>
                <th className="align-middle text-center">Total Cash</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="15">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="15">Error: {error}</td>
                </tr>
              ) : date.length > 0 ? (
                date.map((item, index) => (
                  <tr key={index}>
                    <td>{item.data}</td>
                    <td>{index + 1}</td>
                    <td>
                      <select name="" id="">
                        <option value="salary">Salary</option>
                        <option value="business">Buy</option>
                        <option value="rent">Rent</option>
                      </select>
                    </td>
                    <td>
                      <select name="" id="">
                        <option value="cheque">Cheque</option>
                        <option value="cash">Cash</option>
                      </select>
                    </td>
                    <td>10,000.00</td>
                    <td>1,000.00</td>
                    <td>9,000.00</td>
                    <td>
                      <select name="" id="">
                        <option value="sell">Sell</option>
                        <option value="rent">Rent</option>
                        <option value="others">Others</option>
                      </select>
                    </td>
                    <td>
                      <select name="" id="">
                        <option value="cheque">Cheque</option>
                        <option value="cash">Cash</option>
                      </select>
                    </td>
                    <td>10,000.00</td>
                    <td>1,000.00</td>
                    <td>9,000.00</td>
                    <td>12,000.00</td>
                    <td>4,000.00</td>
                    <td>24,000.00</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15">No data available</td>
                </tr>
              )}
              <>
                <tr>
                  <th className="align-middle text-center">Total Count</th>
                  <th className="align-middle text-center">{date.length}</th>
                  <th className="align-middle text-center" colSpan="2">
                    Total :
                  </th>
                  <th className="align-middle text-center">10,000.00</th>
                  <th className="align-middle text-center">10,000.00</th>
                  <th className="align-middle text-center">10,000.00</th>
                  <th className="align-middle text-center" colSpan={2}>
                    Total :{" "}
                  </th>
                  <th className="align-middle text-center">10,000.00</th>
                  <th className="align-middle text-center">10,000.00</th>
                  <th className="align-middle text-center">10,000.00</th>
                  <th className="align-middle text-center">10,000.00</th>
                  <th className="align-middle text-center">10,000.00</th>
                  <th className="align-middle text-center">10,000.00</th>
                </tr>
              </>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTransition;
