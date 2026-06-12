import React from "react";

type Student = {
	_id: string;
	sname: string;
	sage: number;
	splace: string;
};

type ViewProps = {
	students: Student[];
	onEdit: (student: Student) => void;
	onDelete: (id: string) => void;
	loading: boolean;
};

function View({ students, onEdit, onDelete, loading }: ViewProps) {
	return (
		<section className="panel view-panel">
			<div className="panel-heading">
				<div>
					<p className="section-label">View students</p>
					<h2>Saved records</h2>
				</div>
			</div>

			{loading ? <p className="empty-state">Loading students...</p> : null}

			{!loading && students.length === 0 ? (
				<p className="empty-state">No student records found.</p>
			) : null}

			{!loading && students.length > 0 ? (
				<div className="table-wrap">
					<table className="student-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Age</th>
								<th>Place</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{students.map((student) => (
								<tr key={student._id}>
									<td>{student.sname}</td>
									<td>{student.sage}</td>
									<td>{student.splace}</td>
									<td>
										<div className="row-actions">
											<button type="button" className="ghost-button" onClick={() => onEdit(student)}>
												Edit
											</button>
											<button type="button" className="danger-button" onClick={() => onDelete(student._id)}>
												Delete
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : null}
		</section>
	);
}

export default View;
