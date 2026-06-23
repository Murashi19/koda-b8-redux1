import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { removeData } from "./redux/reducers/surveyResult";

const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "-");

const thead = ["No", "Nama", "Umur", "Gender", "Perokok", "Jenis Rokok", "Aksi"];

export default function TabelData() {
	const dispatch = useDispatch();
	const surveys = useSelector((state) => state.surveyResult.data);

	const getJenisRokok = (jenisRokok) => {
		if (!jenisRokok || jenisRokok.length === 0) return "-";
		return jenisRokok.join(", ");
	};

	// gender dari form: "laki-laki" | "perempuan"
	const genderBadge = (gender) => (gender === "laki-laki" ? "inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700" : "inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-pink-100 text-pink-700");

	// perokok dari form: "ya" | "tidak"
	const perokokBadge = (perokok) =>
		perokok === "ya" ? "inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700" : "inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700";

	return (
		<div className='min-h-screen bg-slate-100 py-8 px-4 font-sans'>
			<div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden'>
				{/* Header */}
				<div className='relative px-10 pt-9 pb-7 border-b border-slate-200 overflow-hidden'>
					<div className='absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-600 to-indigo-400' />
					<span className='inline-block text-[11px] font-bold tracking-widest uppercase text-indigo-600 mb-2'>Survey Kesehatan</span>
					<h1 className='text-2xl font-bold text-slate-900 tracking-tight mb-1'>Data Survey Perokok</h1>
					<p className='text-sm text-slate-400'>{surveys.length} responden tercatat</p>
				</div>

				{/* Table */}
				<div className='overflow-x-auto'>
					{surveys.length === 0 ? (
						<div className='text-center py-16 px-6'>
							<span className='text-4xl block mb-4'>📋</span>
							<p className='text-base font-semibold text-slate-700 mb-2'>Belum ada data survey.</p>
							<p className='text-sm text-slate-400'>Isi form terlebih dahulu untuk melihat data di sini.</p>
						</div>
					) : (
						<table className='w-full text-sm'>
							<thead>
								<tr className='bg-slate-50 border-b-2 border-slate-200'>
									{thead.map((h) => (
										<th
											key={h}
											className='px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400'>
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{surveys.map((survey, idx) => (
									<tr
										key={idx}
										className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
										<td className='px-5 py-3.5 w-12 text-slate-400 font-semibold text-[13px]'>{idx + 1}</td>
										<td className='px-5 py-3.5 font-semibold text-slate-900'>{survey.fullname}</td>
										<td className='px-5 py-3.5 text-slate-600'>{survey.umur}</td>
										<td className='px-5 py-3.5'>
											<span className={genderBadge(survey.gender)}>{capitalize(survey.gender)}</span>
										</td>
										<td className='px-5 py-3.5'>
											<span className={perokokBadge(survey.perokok)}>{capitalize(survey.perokok)}</span>
										</td>
										<td className='px-5 py-3.5 text-slate-500 text-[13px]'>{getJenisRokok(survey.jenisRokok)}</td>
										<td className='px-5 py-3.5'>
											<button
												onClick={() => dispatch(removeData(idx))}
												className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'>
												Hapus
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>

				{/* Footer */}
				<div className='flex items-center justify-between flex-wrap gap-3 px-10 py-5 border-t border-slate-200'>
					<Link
						to='/'
						className='inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors'>
						← Kembali ke Form
					</Link>
					{surveys.length > 0 && <p className='text-[13px] text-slate-400'>Menampilkan {surveys.length} data responden</p>}
				</div>
			</div>
		</div>
	);
}
