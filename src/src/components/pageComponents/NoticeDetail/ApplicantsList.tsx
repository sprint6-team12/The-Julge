import Post from '@/components/Post/Post';
// import EmployerTable from '@/components/Table/EmployerTable';

// data 타입 정해지면 수정예정입니다
// function ApplicantsList({ data }: { data: unknown }) {
function ApplicantsList() {
  return (
    <>
      <Post.Title text="신청자 목록" className="mb-8px" />
      <div className="[&_>div]:w-full">
        {/* <EmployerTable data={data} /> */}
      </div>
    </>
  );
}

export default ApplicantsList;
