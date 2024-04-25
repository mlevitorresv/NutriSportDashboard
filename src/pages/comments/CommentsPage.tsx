import { MenuStyled } from '../../components/common/MenuStyled'
import { SelectStyled } from '../../components/table/SelectStyled'
import { useEffect, useState } from 'react'
import { TableGuestStyled } from '../../components/table/TableGuestStyled'
import { TheadStyled } from '../../components/table/TheadStyled'
import { Tfooter } from '../../components/table/Tfooter'
import { AppDispatch, useAppSelector } from '../../app/store'
import { CommentInterface } from '../../interfaces/commentsInterface'
import { getCommentData, getCommentError, getCommentStatus } from '../../features/comments/commentsSlice'
import { useDispatch } from 'react-redux'
import { deleteCommentToAPIThunk, getCommentListFromAPIThunk } from '../../features/comments/commentsThunk'
import { TrStyled } from '../../components/table/TrStyled'
import { PhotoDataDiv } from '../../components/common/PhotoDataDiv'
import { TrashStyledIcon } from '../../components/common/IconStyled'
import { InputStyled } from '../../components/common/InputStyled'
import { toast } from 'react-toastify'

export const CommentsPage = () => {

    const dispatch: AppDispatch = useDispatch();
    const commentListData = useAppSelector<CommentInterface[]>(getCommentData);
    const commentListError = useAppSelector<string | undefined>(getCommentError);
    const commentListStatus = useAppSelector<string>(getCommentStatus);
    const [commentList, setCommentList] = useState<React.JSX.Element[]>([]);
    const [selectedSort, setSelectedSort] = useState<string>('newest');
    const [spinner, setSpinner] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 10;
    const [searchDescription, setSearchDescription] = useState<string>('')


    useEffect(() => {
        if (commentListStatus === "idle")
            dispatch(getCommentListFromAPIThunk())
        else if (commentListStatus === "pending")
            setSpinner(true)
        else if (commentListStatus === "fulfilled") {
            let components: React.JSX.Element[] = []
            let sortedList: CommentInterface[] = commentListData.slice()

            if (selectedSort === 'newest')
                sortedList.sort((a: CommentInterface, b: CommentInterface) => new Date(b.date).getTime() - new Date(a.date).getTime())
            if (selectedSort === 'oldest')
                sortedList.sort((a: CommentInterface, b: CommentInterface) => new Date(a.date).getTime() - new Date(b.date).getTime())

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, sortedList.length);

            if (searchDescription.length > 0) {
                sortedList = sortedList.filter((comment: CommentInterface) => {
                    return comment.comment.toLowerCase().includes(searchDescription.toLowerCase())
                })
            }

            const paginatedList = sortedList.slice(startIndex, endIndex);
            paginatedList.forEach((comment: CommentInterface) => {
                components.push(
                    <TrStyled>
                        <td>
                            <PhotoDataDiv data={'#' + comment._id} />
                        </td>
                        <td>
                            <PhotoDataDiv data={comment.date.toString()} />
                        </td>
                        <td>
                            <PhotoDataDiv data={comment.email} />
                        </td>
                        <td >
                            <PhotoDataDiv className='comment' data={comment.comment} />
                        </td>
                        <td>
                            <PhotoDataDiv data={<TrashStyledIcon onClick={() => handleRemoveComment(comment._id)} />} />
                        </td>
                    </TrStyled>
                )
            })
            setSpinner(false)
            setCommentList(components)
        }
    }, [dispatch, commentListData, commentListStatus, selectedSort, currentPage, searchDescription])


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRemoveComment = async (commentId: string | undefined) => {
        try {
            if (commentId) {
                await dispatch(deleteCommentToAPIThunk(commentId))
                toast.info('Comentario eliminado', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        } catch (error) {
            console.log('error', error)
            toast.error('No se pudo eliminar el comentario', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    }


    return (
        <>
            <MenuStyled>
                <InputStyled
                    type='secondary'
                    placeholder='Find by comment'
                    onChange={(e) => setSearchDescription(e.target.value)}
                />
                <SelectStyled onChange={(e) => setSelectedSort(e.target.value)}>
                    <option value="newest" selected>Newest</option>
                    <option value="oldest" selected>Oldest</option>
                </SelectStyled>
            </MenuStyled>

            {spinner ? <p>Loading...</p> :
                <TableGuestStyled className='rev'>
                    <TheadStyled>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>email</th>
                            <th>Comment</th>
                        </tr>
                    </TheadStyled>

                    <tbody>
                        {commentList}
                    </tbody>
                </TableGuestStyled>
            }
            <Tfooter
                currentPage={currentPage}
                onPageChanged={handlePageChange}
                items={(commentListData as CommentInterface[]).length}
                itemsPerPage={itemsPerPage}
            />
        </>
    )
}
