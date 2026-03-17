import React, { useState, useRef, useEffect } from "react";

const Calendar = () => {
  const currentDate = new Date();

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth()
  );
  const [selectedYear, setSelectedYear] = useState(
    currentDate.getFullYear()
  );

  const [isMonthDropdownOpen, setIsMonthDropdownOpen] =
    useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] =
    useState(false);

  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const getMonthName = (month) =>
    new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(2000, month, 1)
    );

  const getWeekdayName = (day) =>
    new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      new Date(2023, 0, day + 1)
    );

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setIsMonthDropdownOpen(false);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleClickOutside = (event) => {
    if (
      monthDropdownRef.current &&
      !monthDropdownRef.current.contains(event.target)
    ) {
      setIsMonthDropdownOpen(false);
    }
    if (
      yearDropdownRef.current &&
      !yearDropdownRef.current.contains(event.target)
    ) {
      setIsYearDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderDaysList = () => {
    return Array.from({ length: 7 }, (_, i) => (
      <div
        key={i}
        className="flex-1 text-center text-sm font-medium text-gray-600"
      >
        {getWeekdayName(i)}
      </div>
    ));
  };

  const renderMonthDropdown = () => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      value: i,
      label: getMonthName(i),
    }));

    return (
      <div className="relative" ref={monthDropdownRef}>
        <button
          className="font-bold text-teal-600 hover:scale-105 transition"
          onClick={() =>
            setIsMonthDropdownOpen(!isMonthDropdownOpen)
          }
        >
          {getMonthName(selectedMonth)}
        </button>

        {isMonthDropdownOpen && (
          <div className="absolute mt-2 bg-white shadow-md rounded-md z-10">
            {months.map((m) => (
              <div
                key={m.value}
                className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-sm"
                onClick={() => handleMonthChange(m.value)}
              >
                {m.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderYearDropdown = () => {
    const years = Array.from({ length: 50 }, (_, i) => {
      const year = currentDate.getFullYear() - 25 + i;
      return year;
    });

    return (
      <div className="relative" ref={yearDropdownRef}>
        <button
          className="font-bold text-gray-700 hover:scale-105 transition"
          onClick={() =>
            setIsYearDropdownOpen(!isYearDropdownOpen)
          }
        >
          {selectedYear}
        </button>

        {isYearDropdownOpen && (
          <div className="absolute mt-2 bg-white shadow-md rounded-md max-h-40 overflow-y-auto z-10">
            {years.map((year) => (
              <div
                key={year}
                className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-sm"
                onClick={() => handleYearChange(year)}
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(
      selectedYear,
      selectedMonth
    );
    const firstDay = new Date(
      selectedYear,
      selectedMonth,
      1
    ).getDay();

    const cells = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div key={`empty-${i}`} className="w-8 h-8"></div>
      );
    }

    // Date cells
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        selectedYear,
        selectedMonth,
        i
      );

      const isSelected =
        date.toDateString() === selectedDate.toDateString();

      const isToday =
        date.toDateString() === currentDate.toDateString();

      const classes = `w-8 h-8 flex items-center justify-center rounded-xl text-sm cursor-pointer transition
        ${
          isSelected
            ? "bg-teal-500 text-white"
            : isToday
            ? "bg-sky-500 text-white"
            : "hover:bg-gray-200 text-gray-700"
        }`;

      cells.push(
        <div
          key={`date-${i}`}
          className={classes}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="w-full max-w-sm bg-white p-4 rounded-xl shadow-md">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {renderMonthDropdown()}
        {renderYearDropdown()}
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {renderDaysList()}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendar()}
      </div>

    </div>
  );
};

export default Calendar;
