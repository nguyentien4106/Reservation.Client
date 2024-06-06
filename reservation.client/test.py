import threading
import requests

def send_view_request(user_id):
    url = f'https://thuenguoiyeu.vercel.app/collaborators/76e87d71-6f04-43e5-15ba-08dc7fd1a656'
    res = requests.get(url)
    print(res)

def test_concurrent_views(user_id, num_requests):
    threads = []
    for _ in range(num_requests):
        thread = threading.Thread(target=send_view_request, args=(user_id,))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    # # Verify final count
    # url = f'http://localhost:5000/profile/{user_id}'
    # response = requests.get(url)
    # data = response.json()
    # print(f'Final view count: {data["views"]}')

if __name__ == '__main__':
    user_id = 1
    num_requests = 1000
    test_concurrent_views(user_id, num_requests)