#!/bin/bash

# 사용 가능한 타입 목록
types=("feat" "fix" "docs" "style" "refactor" "test" "chore" "comment" "remove" "rename")

echo "Type을 선택하세요:"
select type in "${types[@]}"
do
    case $type in
        "feat" | "fix" | "docs" | "style" | "refactor" | "test" | "chore" | "comment" | "remove" | "rename")
            echo "$type를 선택하셨습니다."
            selected_type=$type
            break
            ;;
        *)
            echo "잘못된 선택입니다."
            ;;
    esac
done

# 제목 입력
while true
do
    read -p "제목을 입력하세요: " subject
    if [[ -z "$subject" ]]; then
        echo "제목을 입력해주세요."
    else
        break
    fi
done

# 본문 입력
read -p "본문을 입력하세요 (선택사항): " body

# 본문이 72자를 초과하지 않는지 확인
if [[ ! -z "$body" && ${#body} -gt 72 ]]; then
    echo "본문은 72자를 초과할 수 없습니다."
    exit 1
fi

# 커밋 메시지 템플릿 생성
commit_message="$selected_type: $subject"$'\n\n'"$body"

# 템플릿을 파일로 저장
echo "$commit_message" > .git_commit_template.txt

# Git 커밋
git add .
git commit -t .git_commit_template.txt

# 생성한 템플릿 파일 삭제
rm .git_commit_template.txt

# 푸시 여부 확인
while true
do
    read -p "푸시하시겠습니까? [y/n]: " push_option
    case $push_option in
        [Yy]*)
            git push
            echo "푸시되었습니다."
            break
            ;;
        [Nn]*)
            echo "푸시하지 않습니다. 대기합니다."
            break
            ;;
        *)
            echo "잘못된 입력입니다. [y/n] 중 하나를 선택해주세요."
            ;;
    esac
done
