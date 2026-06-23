/* eslint-disable react-hooks/incompatible-library */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Icon
import { FaCheckCircle } from "react-icons/fa";

// Redux
import { useDispatch } from "react-redux";
import { addData } from "./redux/reducers/surveyResult";

const JENIS_ROKOK = [
	{ id: "gg", value: "Gudang Garam", label: "Gudang Garam Filter" },
	{ id: "ls", value: "LuckyStrike", label: "Lucky Strike" },
	{ id: "mb", value: "Marlboro", label: "Marlboro" },
	{ id: "es", value: "Esse", label: "Esse" },
];

const schema = yup.object({
	nama: yup.string().required("Nama wajib diisi.").min(2, "Nama minimal 2 karakter."),
	umur: yup.number().typeError("Umur harus berupa angka.").required("Umur wajib diisi.").min(17, "Umur minimal 17 tahun.").max(120, "Umur terlalu tua."),
	gender: yup.string().oneOf(["laki-laki", "perempuan"]).required(),
	perokok: yup.string().oneOf(["ya", "tidak"]).required(),
	jenis_rokok: yup
		.array()
		.of(yup.string())
		.when("perokok", {
			is: "ya",
			then: (s) => s.min(1, "Pilih minimal satu jenis rokok."),
			otherwise: (s) => s,
		}),
});

function Card({ children, className = "" }) {
	return <div className={`bg-white rounded-xl p-8 mb-6 shadow-sm ${className}`}>{children}</div>;
}

function FieldLabel({ htmlFor, children, required }) {
	return (
		<label
			htmlFor={htmlFor}
			className='block text-base font-semibold text-gray-800 mb-4'>
			{children}
			{required && <span className='text-red-500 ml-1'>*</span>}
		</label>
	);
}

function ErrorMsg({ message }) {
	if (!message) return null;
	return <p className='mt-2 text-sm text-red-500'>{message}</p>;
}

export default function SurveyPerokok() {
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
		defaultValues: {
			gender: "laki-laki",
			perokok: "tidak",
			jenis_rokok: [],
		},
	});

	const isPerokok = watch("perokok") === "ya";

	const onSubmit = (data) => {
		const entry = {
			fullname: data.nama,
			umur: Number(data.umur),
			gender: data.gender,
			perokok: data.perokok,
			jenisRokok: data.jenis_rokok ?? [],
		};
		dispatch(addData(entry));
		setShowModal(true);
		reset();
	};

	return (
		<div className='min-h-screen bg-orange-100 flex justify-center px-4 py-10 font-sans'>
			<div className='w-full max-w-2xl'>
				{/* Header */}
				<Card className='border-t-4 border-orange-400 mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>Survey Perokok</h1>
					<p className='text-gray-500 text-sm'>Silakan isi formulir berikut dengan lengkap.</p>
				</Card>

				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate>
					{/* Nama */}
					<Card>
						<FieldLabel
							htmlFor='nama'
							required>
							Nama
						</FieldLabel>
						<input
							id='nama'
							name='nama'
							type='text'
							placeholder='Jawaban Anda'
							className='w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none  bg-transparent transition-colors'
							{...register("nama")}
						/>
						<ErrorMsg message={errors.nama?.message} />
					</Card>

					{/* Umur */}
					<Card>
						<FieldLabel
							htmlFor='umur'
							required>
							Umur
						</FieldLabel>
						<input
							id='umur'
							name='umur'
							type='number'
							placeholder='Masukkan umur'
							className='w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none  bg-transparent transition-colors'
							{...register("umur")}
						/>
						<ErrorMsg message={errors.umur?.message} />
					</Card>

					{/* Jenis Kelamin */}
					<Card>
						<FieldLabel required>Jenis Kelamin</FieldLabel>
						<div className='flex flex-col gap-3'>
							{[
								{ value: "laki-laki", label: "Laki-laki", id: "gender-l" },
								{ value: "perempuan", label: "Perempuan", id: "gender-p" },
							].map((opt) => (
								<label
									key={opt.id}
									htmlFor={opt.id}
									className='flex items-center gap-3 cursor-pointer'>
									<input
										id={opt.id}
										type='radio'
										name='gender'
										value={opt.value}
										className=' w-4 h-4 cursor-pointer'
										{...register("gender")}
									/>
									<span className='text-gray-700'>{opt.label}</span>
								</label>
							))}
						</div>
					</Card>

					{/* Status Perokok */}
					<Card>
						<FieldLabel required>Apakah anda perokok?</FieldLabel>
						<div className='flex flex-col gap-3'>
							{[
								{ value: "ya", label: "Ya", id: "perokok-ya" },
								{ value: "tidak", label: "Tidak", id: "perokok-tidak" },
							].map((opt) => (
								<label
									key={opt.id}
									htmlFor={opt.id}
									className='flex items-center gap-3 cursor-pointer'>
									<input
										id={opt.id}
										type='radio'
										name='perokok'
										value={opt.value}
										className=' w-4 h-4 cursor-pointer'
										{...register("perokok")}
									/>
									<span className='text-gray-700'>{opt.label}</span>
								</label>
							))}
						</div>
					</Card>

					{/* Jenis Rokok — only shown when isPerokok */}
					{isPerokok && (
						<Card>
							<FieldLabel>Rokok apa yang pernah anda coba?</FieldLabel>
							<div className='flex flex-col gap-3'>
								{JENIS_ROKOK.map((rokok) => (
									<label
										key={rokok.id}
										htmlFor={rokok.id}
										className='flex items-center gap-3 cursor-pointer'>
										<input
											id={rokok.id}
											type='checkbox'
											name='jenis_rokok'
											value={rokok.value}
											className=' w-4 h-4 cursor-pointer'
											{...register("jenis_rokok")}
										/>
										<span className='text-gray-700'>{rokok.label}</span>
									</label>
								))}
							</div>
						</Card>
					)}
					<div className='mb-6 p-4 bg-white border border-blue-200 rounded-lg'>
						<h3 className='font-semibold  mb-1'>Perhatian</h3>

						<p className='text-xs text-gray-600'>Mohon periksa kembali seluruh data yang telah diinput sebelum menekan tombol Submit. Pastikan informasi yang diberikan sesuai</p>
					</div>

					{/* Actions */}
					<div className='flex justify-between items-center mt-2 mb-6'>
						<button
							type='submit'
							className='px-10 py-2 bg-orange-400 hover:bg-orange-500 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer'>
							Submit
						</button>
						<button
							type='button'
							onClick={() => reset()}
							className='text-orange-500 text-sm font-medium bg-transparent border-none cursor-pointer hover:underline'>
							Reset
						</button>
					</div>

					<div className='flex justify-center mb-4'>
						<Link
							to='/tabel-data'
							className='text-orange-500 font-medium text-sm hover:underline'>
							Lihat Tabel Hasil Survey →
						</Link>
					</div>
				</form>
			</div>
			{showModal && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
					<div className='flex flex-col justify-center items-center bg-white p-6 rounded-xl shadow-lg w-100 text-center'>
						<FaCheckCircle className='text-4xl text-green-600 mb-3' />
						<h2 className='text-xl font-bold text-green-600 mb-3'>Berhasil</h2>

						<p className='text-gray-600 mb-5'>Data survey berhasil disimpan.</p>

						<button
							onClick={() => setShowModal(false)}
							className='px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'>
							OK
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
