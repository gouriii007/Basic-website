import React from "react";

type FormState = {
	sname: string;
	sage: string;
	splace: string;
};

type AddProps = {
	formData: FormState;
	onChange: (field: keyof FormState, value: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onCancel: () => void;
	editingId: string | null;
};

function Add({ formData, onChange, onSubmit, onCancel, editingId }: AddProps) {
	return (
		<section className="panel add-panel">
			<div className="panel-heading">
				<div>
					<p className="section-label">Add student</p>
					<h2>{editingId ? "Edit student details" : "Create a new record"}</h2>
				</div>
				{editingId ? <span className="status-chip">Editing</span> : null}
			</div>

			<form className="student-form" onSubmit={onSubmit}>
				<label>
					Student name
					<input
						type="text"
						value={formData.sname}
						onChange={(event) => onChange("sname", event.target.value)}
						placeholder="Enter student name"
						required
					/>
				</label>

				<label>
					Age
					<input
						type="number"
						value={formData.sage}
						onChange={(event) => onChange("sage", event.target.value)}
						placeholder="Enter age"
						min="1"
						required
					/>
				</label>

				<label>
					Place
					<input
						type="text"
						value={formData.splace}
						onChange={(event) => onChange("splace", event.target.value)}
						placeholder="Enter place"
						required
					/>
				</label>

				<div className="form-actions">
					<button type="submit" className="primary-button">
						{editingId ? "Update student" : "Save student"}
					</button>
					{editingId ? (
						<button type="button" className="secondary-button" onClick={onCancel}>
							Cancel
						</button>
					) : null}
				</div>
			</form>
		</section>
	);
}

export default Add;
