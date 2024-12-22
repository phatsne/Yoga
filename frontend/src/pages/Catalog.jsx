import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import Course_Card from '../components/core/Catalog/Course_Card';
import Loading from './../components/common/Loading';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import { fetchCourseCategories } from './../services/operations/courseDetailsAPI';

function Catalog() {
    const { catalogName } = useParams();
    const [active, setActive] = useState(1);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8;

    // Fetch All Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetchCourseCategories();
                const category_id = res.filter(
                    (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
                )[0]._id;
                setCategoryId(category_id);
            } catch (error) {
                console.log("Could not fetch Categories.", error);
            }
        };
        fetchCategories();
    }, [catalogName]);

    useEffect(() => {
        if (categoryId) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const res = await getCatalogPageData(categoryId);
                    setCatalogPageData(res);
                } catch (error) {
                    console.log(error);
                }
                setLoading(false);
            };
            fetchData();
        }
    }, [categoryId]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Pagination logic
    const getPaginatedCourses = (courses) => {
        if (!courses) return [];
        const indexOfLastCourse = currentPage * coursesPerPage;
        const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
        return courses.slice(indexOfFirstCourse, indexOfLastCourse);
    };

    // Get total pages
    const getTotalPages = (courses) => {
        return Math.ceil((courses?.length || 0) / coursesPerPage);
    };

    // Pagination Controls Component
    const PaginationControls = ({ totalPages }) => (
        <div className="flex justify-center items-center gap-2 mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                    currentPage === 1
                        ? 'bg-richblack-300 text-richblack-800 cursor-not-allowed'
                        : 'bg-richblack-700 text-white hover:bg-richblack-600'
                }`}
            >
                Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-md ${
                        currentPage === index + 1
                            ? 'bg-yellow-25 text-richblack-900'
                            : 'bg-richblack-700 text-white hover:bg-richblack-600'
                    }`}
                >
                    {index + 1}
                </button>
            ))}
            
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${
                    currentPage === totalPages
                        ? 'bg-richblack-300 text-richblack-800 cursor-not-allowed'
                        : 'bg-richblack-700 text-white hover:bg-richblack-600'
                }`}
            >
                Next
            </button>
        </div>
    );

    if (loading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Loading />
            </div>
        );
    }

    if (!loading && !catalogPageData) {
        return (
            <div className="text-white text-4xl flex justify-center items-center mt-[20%]">
                No Courses found for selected Category
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <div className="box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
                    <p className="text-sm text-richblack-300">
                        {`Home / Catalog / `}
                        <span className="text-yellow-25">
                            {catalogPageData?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-3xl text-richblack-5">
                        {catalogPageData?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-richblack-200">
                        {catalogPageData?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* Section 1 - Selected Category Courses */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">Tìm khóa học phù hợp với nhu cầu của bạn</div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        className={`px-4 py-2 ${
                            active === 1
                                ? "border-b border-b-yellow-25 text-yellow-25"
                                : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Phổ biến
                    </p>
                    <p
                        className={`px-4 py-2 ${
                            active === 2
                                ? "border-b border-b-yellow-25 text-yellow-25"
                                : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        Mới
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {getPaginatedCourses(catalogPageData?.selectedCategory?.courses)
                        .map((course, i) => (
                            <Course_Card course={course} key={i} Height={"h-[300px]"} />
                        ))}
                </div>
                {getTotalPages(catalogPageData?.selectedCategory?.courses) > 1 && (
                    <PaginationControls 
                        totalPages={getTotalPages(catalogPageData?.selectedCategory?.courses)} 
                    />
                )}
            </div>


            {/* Section 3 - Most Selling Courses */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">Bán chạy</div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {catalogPageData?.mostSellingCourses?.map((course, i) => (
                        <Course_Card course={course} key={i} Height={"h-[300px]"} />
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Catalog;