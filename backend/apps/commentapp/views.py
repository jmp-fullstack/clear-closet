from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.articleapp.models import Article
from apps.commentapp.models import Comment
from apps.commentapp.serializers import CommentSerializer

# 댓글 생성
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_comment(request, article_pk):
    try:
        article = Article.objects.get(pk=article_pk)
    except Article.DoesNotExist:
        return Response({"error": "페이지를 찾을 수 없음."}, status=status.HTTP_404_NOT_FOUND)

    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user, article=article)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 댓글 삭제
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def delete_comment(request, article_pk, comment_pk):
    try:
        article = Article.objects.get(pk=article_pk)
    except Article.DoesNotExist:
        return Response({"error": "댓글을 찾을 수 없음."}, status=status.HTTP_404_NOT_FOUND)
    try:
        comment = Comment.objects.get(pk=comment_pk, article=article, user=request.user)

    except Comment.DoesNotExist:
        return Response({"error": "권한이 없습니다."}, status=status.HTTP_404_NOT_FOUND)
    
    comment.delete()
    return Response({"message": "댓글이 삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)


# 댓글 수정
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['PATCH'])
def fetch_comment(request, article_pk, comment_pk):
    try:
        article = Article.objects.get(pk=article_pk)
    except Article.DoesNotExist:
        return Response({"error": "댓글을 찾을 수 없음."}, status=status.HTTP_404_NOT_FOUND)

    try:
        comment = Comment.objects.get(pk=comment_pk, article=article, user=request.user)
    except Comment.DoesNotExist:
        return Response({"error": "권한이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    serializer = CommentSerializer(comment, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 게시글 -> 댓글 리스트
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def list_comments(request, article_pk):
    try:
        article = Article.objects.get(pk=article_pk)
    except Article.DoesNotExist:
        return Response({"error": "댓글을 찾을 수 없음."}, status=status.HTTP_404_NOT_FOUND)

    comments = Comment.objects.filter(article=article)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)