import { InsertUserData, InsertUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, GetCurrentUserData, ListUsersData, CreateProjectData, CreateProjectVariables, UpdateProjectData, UpdateProjectVariables, DeleteProjectData, DeleteProjectVariables, GetProjectData, GetProjectVariables, ListProjectsData, CreateTaskData, CreateTaskVariables, UpdateTaskData, UpdateTaskVariables, DeleteTaskData, DeleteTaskVariables, GetTaskData, GetTaskVariables, ListTasksData, CreateCommentData, CreateCommentVariables, UpdateCommentData, UpdateCommentVariables, DeleteCommentData, DeleteCommentVariables, GetCommentData, GetCommentVariables, ListCommentsData, CreateTagData, CreateTagVariables, UpdateTagData, UpdateTagVariables, DeleteTagData, DeleteTagVariables, GetTagData, GetTagVariables, ListTagsData, AddTagToTaskData, AddTagToTaskVariables, RemoveTagFromTaskData, RemoveTagFromTaskVariables, GetTaskTagsData, GetTaskTagsVariables, ListTaskTagsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useInsertUser(options?: useDataConnectMutationOptions<InsertUserData, FirebaseError, InsertUserVariables>): UseDataConnectMutationResult<InsertUserData, InsertUserVariables>;
export function useInsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<InsertUserData, FirebaseError, InsertUserVariables>): UseDataConnectMutationResult<InsertUserData, InsertUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
export function useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useCreateProject(options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;
export function useCreateProject(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProjectData, FirebaseError, CreateProjectVariables>): UseDataConnectMutationResult<CreateProjectData, CreateProjectVariables>;

export function useUpdateProject(options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;
export function useUpdateProject(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectData, FirebaseError, UpdateProjectVariables>): UseDataConnectMutationResult<UpdateProjectData, UpdateProjectVariables>;

export function useDeleteProject(options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;
export function useDeleteProject(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProjectData, FirebaseError, DeleteProjectVariables>): UseDataConnectMutationResult<DeleteProjectData, DeleteProjectVariables>;

export function useGetProject(vars: GetProjectVariables, options?: useDataConnectQueryOptions<GetProjectData>): UseDataConnectQueryResult<GetProjectData, GetProjectVariables>;
export function useGetProject(dc: DataConnect, vars: GetProjectVariables, options?: useDataConnectQueryOptions<GetProjectData>): UseDataConnectQueryResult<GetProjectData, GetProjectVariables>;

export function useListProjects(options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, undefined>;
export function useListProjects(dc: DataConnect, options?: useDataConnectQueryOptions<ListProjectsData>): UseDataConnectQueryResult<ListProjectsData, undefined>;

export function useCreateTask(options?: useDataConnectMutationOptions<CreateTaskData, FirebaseError, CreateTaskVariables>): UseDataConnectMutationResult<CreateTaskData, CreateTaskVariables>;
export function useCreateTask(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTaskData, FirebaseError, CreateTaskVariables>): UseDataConnectMutationResult<CreateTaskData, CreateTaskVariables>;

export function useUpdateTask(options?: useDataConnectMutationOptions<UpdateTaskData, FirebaseError, UpdateTaskVariables>): UseDataConnectMutationResult<UpdateTaskData, UpdateTaskVariables>;
export function useUpdateTask(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTaskData, FirebaseError, UpdateTaskVariables>): UseDataConnectMutationResult<UpdateTaskData, UpdateTaskVariables>;

export function useDeleteTask(options?: useDataConnectMutationOptions<DeleteTaskData, FirebaseError, DeleteTaskVariables>): UseDataConnectMutationResult<DeleteTaskData, DeleteTaskVariables>;
export function useDeleteTask(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTaskData, FirebaseError, DeleteTaskVariables>): UseDataConnectMutationResult<DeleteTaskData, DeleteTaskVariables>;

export function useGetTask(vars: GetTaskVariables, options?: useDataConnectQueryOptions<GetTaskData>): UseDataConnectQueryResult<GetTaskData, GetTaskVariables>;
export function useGetTask(dc: DataConnect, vars: GetTaskVariables, options?: useDataConnectQueryOptions<GetTaskData>): UseDataConnectQueryResult<GetTaskData, GetTaskVariables>;

export function useListTasks(options?: useDataConnectQueryOptions<ListTasksData>): UseDataConnectQueryResult<ListTasksData, undefined>;
export function useListTasks(dc: DataConnect, options?: useDataConnectQueryOptions<ListTasksData>): UseDataConnectQueryResult<ListTasksData, undefined>;

export function useCreateComment(options?: useDataConnectMutationOptions<CreateCommentData, FirebaseError, CreateCommentVariables>): UseDataConnectMutationResult<CreateCommentData, CreateCommentVariables>;
export function useCreateComment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCommentData, FirebaseError, CreateCommentVariables>): UseDataConnectMutationResult<CreateCommentData, CreateCommentVariables>;

export function useUpdateComment(options?: useDataConnectMutationOptions<UpdateCommentData, FirebaseError, UpdateCommentVariables>): UseDataConnectMutationResult<UpdateCommentData, UpdateCommentVariables>;
export function useUpdateComment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCommentData, FirebaseError, UpdateCommentVariables>): UseDataConnectMutationResult<UpdateCommentData, UpdateCommentVariables>;

export function useDeleteComment(options?: useDataConnectMutationOptions<DeleteCommentData, FirebaseError, DeleteCommentVariables>): UseDataConnectMutationResult<DeleteCommentData, DeleteCommentVariables>;
export function useDeleteComment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCommentData, FirebaseError, DeleteCommentVariables>): UseDataConnectMutationResult<DeleteCommentData, DeleteCommentVariables>;

export function useGetComment(vars: GetCommentVariables, options?: useDataConnectQueryOptions<GetCommentData>): UseDataConnectQueryResult<GetCommentData, GetCommentVariables>;
export function useGetComment(dc: DataConnect, vars: GetCommentVariables, options?: useDataConnectQueryOptions<GetCommentData>): UseDataConnectQueryResult<GetCommentData, GetCommentVariables>;

export function useListComments(options?: useDataConnectQueryOptions<ListCommentsData>): UseDataConnectQueryResult<ListCommentsData, undefined>;
export function useListComments(dc: DataConnect, options?: useDataConnectQueryOptions<ListCommentsData>): UseDataConnectQueryResult<ListCommentsData, undefined>;

export function useCreateTag(options?: useDataConnectMutationOptions<CreateTagData, FirebaseError, CreateTagVariables>): UseDataConnectMutationResult<CreateTagData, CreateTagVariables>;
export function useCreateTag(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTagData, FirebaseError, CreateTagVariables>): UseDataConnectMutationResult<CreateTagData, CreateTagVariables>;

export function useUpdateTag(options?: useDataConnectMutationOptions<UpdateTagData, FirebaseError, UpdateTagVariables>): UseDataConnectMutationResult<UpdateTagData, UpdateTagVariables>;
export function useUpdateTag(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTagData, FirebaseError, UpdateTagVariables>): UseDataConnectMutationResult<UpdateTagData, UpdateTagVariables>;

export function useDeleteTag(options?: useDataConnectMutationOptions<DeleteTagData, FirebaseError, DeleteTagVariables>): UseDataConnectMutationResult<DeleteTagData, DeleteTagVariables>;
export function useDeleteTag(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTagData, FirebaseError, DeleteTagVariables>): UseDataConnectMutationResult<DeleteTagData, DeleteTagVariables>;

export function useGetTag(vars: GetTagVariables, options?: useDataConnectQueryOptions<GetTagData>): UseDataConnectQueryResult<GetTagData, GetTagVariables>;
export function useGetTag(dc: DataConnect, vars: GetTagVariables, options?: useDataConnectQueryOptions<GetTagData>): UseDataConnectQueryResult<GetTagData, GetTagVariables>;

export function useListTags(options?: useDataConnectQueryOptions<ListTagsData>): UseDataConnectQueryResult<ListTagsData, undefined>;
export function useListTags(dc: DataConnect, options?: useDataConnectQueryOptions<ListTagsData>): UseDataConnectQueryResult<ListTagsData, undefined>;

export function useAddTagToTask(options?: useDataConnectMutationOptions<AddTagToTaskData, FirebaseError, AddTagToTaskVariables>): UseDataConnectMutationResult<AddTagToTaskData, AddTagToTaskVariables>;
export function useAddTagToTask(dc: DataConnect, options?: useDataConnectMutationOptions<AddTagToTaskData, FirebaseError, AddTagToTaskVariables>): UseDataConnectMutationResult<AddTagToTaskData, AddTagToTaskVariables>;

export function useRemoveTagFromTask(options?: useDataConnectMutationOptions<RemoveTagFromTaskData, FirebaseError, RemoveTagFromTaskVariables>): UseDataConnectMutationResult<RemoveTagFromTaskData, RemoveTagFromTaskVariables>;
export function useRemoveTagFromTask(dc: DataConnect, options?: useDataConnectMutationOptions<RemoveTagFromTaskData, FirebaseError, RemoveTagFromTaskVariables>): UseDataConnectMutationResult<RemoveTagFromTaskData, RemoveTagFromTaskVariables>;

export function useGetTaskTags(vars: GetTaskTagsVariables, options?: useDataConnectQueryOptions<GetTaskTagsData>): UseDataConnectQueryResult<GetTaskTagsData, GetTaskTagsVariables>;
export function useGetTaskTags(dc: DataConnect, vars: GetTaskTagsVariables, options?: useDataConnectQueryOptions<GetTaskTagsData>): UseDataConnectQueryResult<GetTaskTagsData, GetTaskTagsVariables>;

export function useListTaskTags(options?: useDataConnectQueryOptions<ListTaskTagsData>): UseDataConnectQueryResult<ListTaskTagsData, undefined>;
export function useListTaskTags(dc: DataConnect, options?: useDataConnectQueryOptions<ListTaskTagsData>): UseDataConnectQueryResult<ListTaskTagsData, undefined>;
