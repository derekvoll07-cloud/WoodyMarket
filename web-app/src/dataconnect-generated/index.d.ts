import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddTagToTaskData {
  taskTag_insert: TaskTag_Key;
}

export interface AddTagToTaskVariables {
  taskId: UUIDString;
  tagId: UUIDString;
}

export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateCommentData {
  comment_insert: Comment_Key;
}

export interface CreateCommentVariables {
  taskId: UUIDString;
  content: string;
}

export interface CreateProjectData {
  project_insert: Project_Key;
}

export interface CreateProjectVariables {
  title: string;
  description?: string | null;
}

export interface CreateTagData {
  tag_insert: Tag_Key;
}

export interface CreateTagVariables {
  name: string;
  color: string;
}

export interface CreateTaskData {
  task_insert: Task_Key;
}

export interface CreateTaskVariables {
  title: string;
  status: string;
  projectId: UUIDString;
}

export interface DeleteCommentData {
  comment_delete?: Comment_Key | null;
}

export interface DeleteCommentVariables {
  id: UUIDString;
}

export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}

export interface DeleteProjectVariables {
  id: UUIDString;
}

export interface DeleteTagData {
  tag_delete?: Tag_Key | null;
}

export interface DeleteTagVariables {
  id: UUIDString;
}

export interface DeleteTaskData {
  task_delete?: Task_Key | null;
}

export interface DeleteTaskVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface GetCommentData {
  comment?: {
    content: string;
    createdAt?: TimestampString | null;
    author: {
      displayName: string;
    };
  };
}

export interface GetCommentVariables {
  id: UUIDString;
}

export interface GetCurrentUserData {
  user?: {
    id: UUIDString;
    email: string;
    displayName: string;
    avatarUrl?: string | null;
  } & User_Key;
}

export interface GetProjectData {
  project?: {
    title: string;
    description?: string | null;
    owner: {
      displayName: string;
    };
  };
}

export interface GetProjectVariables {
  id: UUIDString;
}

export interface GetTagData {
  tag?: {
    name: string;
    color: string;
    description?: string | null;
  };
}

export interface GetTagVariables {
  id: UUIDString;
}

export interface GetTaskData {
  task?: {
    title: string;
    status: string;
    dueDate?: TimestampString | null;
    project: {
      title: string;
    };
  };
}

export interface GetTaskTagsData {
  taskTags: ({
    tag: {
      name: string;
      color: string;
    };
  })[];
}

export interface GetTaskTagsVariables {
  taskId: UUIDString;
}

export interface GetTaskVariables {
  id: UUIDString;
}

export interface InsertUserData {
  user_insert: User_Key;
}

export interface InsertUserVariables {
  email: string;
  displayName: string;
}

export interface ListCommentsData {
  comments: ({
    id: UUIDString;
    content: string;
    createdAt?: TimestampString | null;
  } & Comment_Key)[];
}

export interface ListProjectsData {
  projects: ({
    id: UUIDString;
    title: string;
    createdAt?: TimestampString | null;
  } & Project_Key)[];
}

export interface ListTagsData {
  tags: ({
    id: UUIDString;
    name: string;
    color: string;
  } & Tag_Key)[];
}

export interface ListTaskTagsData {
  taskTags: ({
    taskId: UUIDString;
    tagId: UUIDString;
  } & TaskTag_Key)[];
}

export interface ListTasksData {
  tasks: ({
    id: UUIDString;
    title: string;
    status: string;
  } & Task_Key)[];
}

export interface ListUsersData {
  users: ({
    id: UUIDString;
    displayName: string;
    avatarUrl?: string | null;
  } & User_Key)[];
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface RemoveTagFromTaskData {
  taskTag_delete?: TaskTag_Key | null;
}

export interface RemoveTagFromTaskVariables {
  taskId: UUIDString;
  tagId: UUIDString;
}

export interface Tag_Key {
  id: UUIDString;
  __typename?: 'Tag_Key';
}

export interface TaskTag_Key {
  taskId: UUIDString;
  tagId: UUIDString;
  __typename?: 'TaskTag_Key';
}

export interface Task_Key {
  id: UUIDString;
  __typename?: 'Task_Key';
}

export interface UpdateCommentData {
  comment_update?: Comment_Key | null;
}

export interface UpdateCommentVariables {
  id: UUIDString;
  content?: string | null;
}

export interface UpdateProjectData {
  project_update?: Project_Key | null;
}

export interface UpdateProjectVariables {
  id: UUIDString;
  title?: string | null;
}

export interface UpdateTagData {
  tag_update?: Tag_Key | null;
}

export interface UpdateTagVariables {
  id: UUIDString;
  color?: string | null;
}

export interface UpdateTaskData {
  task_update?: Task_Key | null;
}

export interface UpdateTaskVariables {
  id: UUIDString;
  status?: string | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  displayName?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface InsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertUserVariables): MutationRef<InsertUserData, InsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertUserVariables): MutationRef<InsertUserData, InsertUserVariables>;
  operationName: string;
}
export const insertUserRef: InsertUserRef;

export function insertUser(vars: InsertUserVariables): MutationPromise<InsertUserData, InsertUserVariables>;
export function insertUser(dc: DataConnect, vars: InsertUserVariables): MutationPromise<InsertUserData, InsertUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  operationName: string;
}
export const createProjectRef: CreateProjectRef;

export function createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;
export function createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface UpdateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  operationName: string;
}
export const updateProjectRef: UpdateProjectRef;

export function updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;
export function updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface DeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  operationName: string;
}
export const deleteProjectRef: DeleteProjectRef;

export function deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface GetProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProjectVariables): QueryRef<GetProjectData, GetProjectVariables>;
  operationName: string;
}
export const getProjectRef: GetProjectRef;

export function getProject(vars: GetProjectVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectData, GetProjectVariables>;
export function getProject(dc: DataConnect, vars: GetProjectVariables, options?: ExecuteQueryOptions): QueryPromise<GetProjectData, GetProjectVariables>;

interface ListProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
  operationName: string;
}
export const listProjectsRef: ListProjectsRef;

export function listProjects(options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;
export function listProjects(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProjectsData, undefined>;

interface CreateTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTaskVariables): MutationRef<CreateTaskData, CreateTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTaskVariables): MutationRef<CreateTaskData, CreateTaskVariables>;
  operationName: string;
}
export const createTaskRef: CreateTaskRef;

export function createTask(vars: CreateTaskVariables): MutationPromise<CreateTaskData, CreateTaskVariables>;
export function createTask(dc: DataConnect, vars: CreateTaskVariables): MutationPromise<CreateTaskData, CreateTaskVariables>;

interface UpdateTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTaskVariables): MutationRef<UpdateTaskData, UpdateTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTaskVariables): MutationRef<UpdateTaskData, UpdateTaskVariables>;
  operationName: string;
}
export const updateTaskRef: UpdateTaskRef;

export function updateTask(vars: UpdateTaskVariables): MutationPromise<UpdateTaskData, UpdateTaskVariables>;
export function updateTask(dc: DataConnect, vars: UpdateTaskVariables): MutationPromise<UpdateTaskData, UpdateTaskVariables>;

interface DeleteTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTaskVariables): MutationRef<DeleteTaskData, DeleteTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTaskVariables): MutationRef<DeleteTaskData, DeleteTaskVariables>;
  operationName: string;
}
export const deleteTaskRef: DeleteTaskRef;

export function deleteTask(vars: DeleteTaskVariables): MutationPromise<DeleteTaskData, DeleteTaskVariables>;
export function deleteTask(dc: DataConnect, vars: DeleteTaskVariables): MutationPromise<DeleteTaskData, DeleteTaskVariables>;

interface GetTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTaskVariables): QueryRef<GetTaskData, GetTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTaskVariables): QueryRef<GetTaskData, GetTaskVariables>;
  operationName: string;
}
export const getTaskRef: GetTaskRef;

export function getTask(vars: GetTaskVariables, options?: ExecuteQueryOptions): QueryPromise<GetTaskData, GetTaskVariables>;
export function getTask(dc: DataConnect, vars: GetTaskVariables, options?: ExecuteQueryOptions): QueryPromise<GetTaskData, GetTaskVariables>;

interface ListTasksRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTasksData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTasksData, undefined>;
  operationName: string;
}
export const listTasksRef: ListTasksRef;

export function listTasks(options?: ExecuteQueryOptions): QueryPromise<ListTasksData, undefined>;
export function listTasks(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTasksData, undefined>;

interface CreateCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  operationName: string;
}
export const createCommentRef: CreateCommentRef;

export function createComment(vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;
export function createComment(dc: DataConnect, vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;

interface UpdateCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCommentVariables): MutationRef<UpdateCommentData, UpdateCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCommentVariables): MutationRef<UpdateCommentData, UpdateCommentVariables>;
  operationName: string;
}
export const updateCommentRef: UpdateCommentRef;

export function updateComment(vars: UpdateCommentVariables): MutationPromise<UpdateCommentData, UpdateCommentVariables>;
export function updateComment(dc: DataConnect, vars: UpdateCommentVariables): MutationPromise<UpdateCommentData, UpdateCommentVariables>;

interface DeleteCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCommentVariables): MutationRef<DeleteCommentData, DeleteCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCommentVariables): MutationRef<DeleteCommentData, DeleteCommentVariables>;
  operationName: string;
}
export const deleteCommentRef: DeleteCommentRef;

export function deleteComment(vars: DeleteCommentVariables): MutationPromise<DeleteCommentData, DeleteCommentVariables>;
export function deleteComment(dc: DataConnect, vars: DeleteCommentVariables): MutationPromise<DeleteCommentData, DeleteCommentVariables>;

interface GetCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCommentVariables): QueryRef<GetCommentData, GetCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCommentVariables): QueryRef<GetCommentData, GetCommentVariables>;
  operationName: string;
}
export const getCommentRef: GetCommentRef;

export function getComment(vars: GetCommentVariables, options?: ExecuteQueryOptions): QueryPromise<GetCommentData, GetCommentVariables>;
export function getComment(dc: DataConnect, vars: GetCommentVariables, options?: ExecuteQueryOptions): QueryPromise<GetCommentData, GetCommentVariables>;

interface ListCommentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCommentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCommentsData, undefined>;
  operationName: string;
}
export const listCommentsRef: ListCommentsRef;

export function listComments(options?: ExecuteQueryOptions): QueryPromise<ListCommentsData, undefined>;
export function listComments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCommentsData, undefined>;

interface CreateTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTagVariables): MutationRef<CreateTagData, CreateTagVariables>;
  operationName: string;
}
export const createTagRef: CreateTagRef;

export function createTag(vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;
export function createTag(dc: DataConnect, vars: CreateTagVariables): MutationPromise<CreateTagData, CreateTagVariables>;

interface UpdateTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTagVariables): MutationRef<UpdateTagData, UpdateTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTagVariables): MutationRef<UpdateTagData, UpdateTagVariables>;
  operationName: string;
}
export const updateTagRef: UpdateTagRef;

export function updateTag(vars: UpdateTagVariables): MutationPromise<UpdateTagData, UpdateTagVariables>;
export function updateTag(dc: DataConnect, vars: UpdateTagVariables): MutationPromise<UpdateTagData, UpdateTagVariables>;

interface DeleteTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTagVariables): MutationRef<DeleteTagData, DeleteTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTagVariables): MutationRef<DeleteTagData, DeleteTagVariables>;
  operationName: string;
}
export const deleteTagRef: DeleteTagRef;

export function deleteTag(vars: DeleteTagVariables): MutationPromise<DeleteTagData, DeleteTagVariables>;
export function deleteTag(dc: DataConnect, vars: DeleteTagVariables): MutationPromise<DeleteTagData, DeleteTagVariables>;

interface GetTagRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTagVariables): QueryRef<GetTagData, GetTagVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTagVariables): QueryRef<GetTagData, GetTagVariables>;
  operationName: string;
}
export const getTagRef: GetTagRef;

export function getTag(vars: GetTagVariables, options?: ExecuteQueryOptions): QueryPromise<GetTagData, GetTagVariables>;
export function getTag(dc: DataConnect, vars: GetTagVariables, options?: ExecuteQueryOptions): QueryPromise<GetTagData, GetTagVariables>;

interface ListTagsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTagsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTagsData, undefined>;
  operationName: string;
}
export const listTagsRef: ListTagsRef;

export function listTags(options?: ExecuteQueryOptions): QueryPromise<ListTagsData, undefined>;
export function listTags(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTagsData, undefined>;

interface AddTagToTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTagToTaskVariables): MutationRef<AddTagToTaskData, AddTagToTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddTagToTaskVariables): MutationRef<AddTagToTaskData, AddTagToTaskVariables>;
  operationName: string;
}
export const addTagToTaskRef: AddTagToTaskRef;

export function addTagToTask(vars: AddTagToTaskVariables): MutationPromise<AddTagToTaskData, AddTagToTaskVariables>;
export function addTagToTask(dc: DataConnect, vars: AddTagToTaskVariables): MutationPromise<AddTagToTaskData, AddTagToTaskVariables>;

interface RemoveTagFromTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTagFromTaskVariables): MutationRef<RemoveTagFromTaskData, RemoveTagFromTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveTagFromTaskVariables): MutationRef<RemoveTagFromTaskData, RemoveTagFromTaskVariables>;
  operationName: string;
}
export const removeTagFromTaskRef: RemoveTagFromTaskRef;

export function removeTagFromTask(vars: RemoveTagFromTaskVariables): MutationPromise<RemoveTagFromTaskData, RemoveTagFromTaskVariables>;
export function removeTagFromTask(dc: DataConnect, vars: RemoveTagFromTaskVariables): MutationPromise<RemoveTagFromTaskData, RemoveTagFromTaskVariables>;

interface GetTaskTagsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTaskTagsVariables): QueryRef<GetTaskTagsData, GetTaskTagsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTaskTagsVariables): QueryRef<GetTaskTagsData, GetTaskTagsVariables>;
  operationName: string;
}
export const getTaskTagsRef: GetTaskTagsRef;

export function getTaskTags(vars: GetTaskTagsVariables, options?: ExecuteQueryOptions): QueryPromise<GetTaskTagsData, GetTaskTagsVariables>;
export function getTaskTags(dc: DataConnect, vars: GetTaskTagsVariables, options?: ExecuteQueryOptions): QueryPromise<GetTaskTagsData, GetTaskTagsVariables>;

interface ListTaskTagsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTaskTagsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTaskTagsData, undefined>;
  operationName: string;
}
export const listTaskTagsRef: ListTaskTagsRef;

export function listTaskTags(options?: ExecuteQueryOptions): QueryPromise<ListTaskTagsData, undefined>;
export function listTaskTags(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTaskTagsData, undefined>;

