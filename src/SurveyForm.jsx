/* eslint-disable react-hooks/incompatible-library */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
	const [submitted, setSubmitted] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			gender: "laki-laki",
			perokok: "tidak",
			jenis_rokok: [],
		},
	});

	const isPerokok = watch("perokok") === "ya";

	const onSubmit = (data) => {
		const existing = JSON.parse(localStorage.getItem("data-survey") || "[]");
		const entry = {
			fullname: data.nama,
			umur: Number(data.umur),
			gender: data.gender,
			perokok: data.perokok,
			jenisRokok: data.jenis_rokok ?? [],
		};
		localStorage.setItem("data-survey", JSON.stringify([...existing, entry]));
		setSubmitted(true);
		reset();
		setTimeout(() => setSubmitted(false), 3000);
	};

	return (
		<div className='min-h-screen bg-orange-100 flex justify-center px-4 py-10 font-sans'>
			<div className='w-full max-w-2xl'>
				{/* Header */}
				<Card className='border-t-4 border-orange-400 mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>Survey Perokok</h1>
					<p className='text-gray-500 text-sm'>Silakan isi formulir berikut dengan lengkap.</p>
				</Card>

				{/* Success Banner */}
				{submitted && <div className='mb-6 px-5 py-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm font-medium'>✓ Data berhasil disimpan!</div>}

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
						<a
							href='tabelData.html'
							className='text-orange-500 font-medium text-sm hover:underline'>
							Lihat Tabel Hasil Survey →
						</a>
					</div>
				</form>
			</div>
		</div>
	);
}
