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
import { getCommentListFromAPIThunk } from '../../features/comments/commentsThunk'
import { TrStyled } from '../../components/table/TrStyled'
import { PhotoDataDiv } from '../../components/common/PhotoDataDiv'
import { TrashStyledIcon } from '../../components/common/IconStyled'

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
                            <TrashStyledIcon />
                        </td>
                    </TrStyled>
                )
            })
            setSpinner(false)
            setCommentList(components)
        }
    }, [dispatch, commentListData, commentListStatus, selectedSort, currentPage])


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }


    return (
        <>
            <MenuStyled>
                <div>
                    <SelectStyled onChange={(e) => setSelectedSort(e.target.value)}>
                        <option value="newest" selected>Newest</option>
                        <option value="oldest" selected>Oldest</option>
                    </SelectStyled>
                </div>
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
