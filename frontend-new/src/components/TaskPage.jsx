import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextFieldInput from '../common/TextFieldInput';
import ButtonField from '../common/ButtonField';

const TaskPage = (props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      effort: '',
      due_date: ''
    }
  });

  const [editTaskId, setEditTaskId] = useState(null);

  const onSubmit = (data) => {
    editTaskId
      ? props.updateTasksApiCallById(data, editTaskId, reset)
      : props.createTasksApiCall(data, reset);
  };

  const onEditClick = (task) => {
    setEditTaskId(task.id);
    reset({
      title: task.title,
      description: task.description,
      effort: task.effort_to_finish,
      due_date: task.due_date
    });
  };

  const handleDelete = (task) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the task "${task.title}"?`);
    if (confirmDelete) {
      props.deleteTasksApiCallById(task.id);
    }
  };

  useEffect(() => {
    props.getAllTasksApiCall();
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-6 bg-gray-100 h-[92vh]">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Task Manager</h2>

      <div className='w-full md:flex gap-[3%]'>
        {/* Form */}
        <div className="md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white p-6 rounded-xl shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">{editTaskId ? 'Edit Task' : 'Add a New Task'}</h3>

          <form className="space-y-4">
            {/* Title */}
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextFieldInput
                  placeholder="Title"
                  floatingLabel="Title"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!errors.title}
                  errorText={errors.title && 'Title is required'}
                />
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextFieldInput
                  placeholder="Description"
                  floatingLabel="Description"
                  fullWidth
                  multiline
                  minRows={3}
                  value={value}
                  onChange={onChange}
                  error={!!errors.description}
                  errorText={errors.description && 'Description is required'}
                />
              )}
            />

            {/* Effort */}
            <Controller
              name="effort"
              control={control}
              rules={{
                required: 'Effort is required',
                min: { value: 1, message: 'Effort must be at least 1' },
                pattern: { value: /^[0-9]+$/, message: 'Effort must be a number' }
              }}
              render={({ field: { onChange, value } }) => (
                <TextFieldInput
                  value={value}
                  onChange={onChange}
                  placeholder="Effort (days)"
                  floatingLabel="Effort"
                  typeNumber
                  fullWidth
                  error={!!errors.effort}
                  errorText={errors.effort?.message}
                />
              )}
            />

            {/* Due Date */}
            <Controller
              name="due_date"
              control={control}
              rules={{
                required: 'Due date is required',
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: 'Date must be in YYYY-MM-DD format'
                },
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return selectedDate >= today || 'Invalid Date';
                }
              }}
              render={({ field: { onChange, value } }) => (
                <TextFieldInput
                  value={value}
                  onChange={onChange}
                  floatingLabel="Due Date"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  fullWidth
                  error={!!errors.due_date}
                  errorText={errors.due_date?.message}
                />
              )}
            />

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <ButtonField
                type="submit"
                buttonName={`${editTaskId ? 'Update Task' : 'Add Task'}`}
                buttonextracls="!w-full !bg-blue-600 !text-white hover:!bg-blue-500"
                onClick={handleSubmit(onSubmit)}
              />
              {editTaskId && (
                <ButtonField
                  type="reset"
                  buttonName="Cancel Edit"
                  buttonextracls="!w-full !bg-gray-400 !text-white hover:!bg-gray-500"
                  onClick={() => {
                    reset({
                      title: '',
                      description: '',
                      effort: '',
                      due_date: ''
                    });
                    setEditTaskId(null);
                  }}
                />
              )}
            </div>
          </form>
        </div>

        {/* Task List */}
        <div className="md:w-1/2 lg:w-2/3 xl:w-3/4">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">My Tasks</h3>

          <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
            {props.tasks && props.tasks.length > 0 && props.tasks
              .filter(task => task?.username === localStorage?.getItem('username'))
              .map((task, idx) => (
                <li key={idx} className="bg-white shadow-sm rounded-lg p-4 justify-between items-start border hover:shadow-md transition-all">
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{task.title}</p>
                    <p className="text-gray-600 text-sm mb-1">{task.description}</p>
                    <p className="text-gray-500 text-xs">⏳ Due: {task.due_date}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ButtonField
                      buttonName="Edit"
                      onClick={() => onEditClick(task)}
                      buttonextracls="!text-sm !text-blue-600 hover:!underline"
                    />
                    <ButtonField
                      buttonName="Delete"
                      onClick={() => handleDelete(task)}
                      buttonextracls="!text-sm !text-red-600 hover:!underline"
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
